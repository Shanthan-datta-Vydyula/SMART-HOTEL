import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ManagerAddUserService, UserBookingData } from '../services/manager-add-user.service';
import { UserService } from '../apiService/userService';
import { HotelService } from '../apiService/hotel.service';
 
@Component({
  selector: 'app-manager-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-add-user.html',
  styleUrls: ['./manager-add-user.css']
})
export class ManagerAddUserComponent implements OnInit {
  // @Output() close = new EventEmitter<void>();
  // @Output() userAdded = new EventEmitter<UserBookingData>();
 
  // Form data properties
   fullName: string = '';
  email: string = '';
  phone: string = '';
  startDate: string = '';
  endDate: string = '';
  selectedHotel: string = '';
  selectedRoomType: string = '';
  numberOfGuests: number = 1;
  numberOfRooms: number = 1;
 
 
  // Validation properties
  showFormErrors: boolean = false;
 
  // Booking tracking properties
  isBookingCreated: boolean = false;
  currentBookingId: string = '';
 
  // Dropdown options
  hotels: any[] = [];
  roomTypes: string[] = [];
  today: string = '';
 
  constructor(private router: Router, private userService: UserService,private hotelService:HotelService) {}
 
  ngOnInit(): void {
   
    this.today = new Date().toISOString().split('T')[0];
 
    this.hotelService.getHotels().subscribe({
      next: (response: any) => {
        this.hotels = response;
        console.log('Fetched hotels:', this.hotels);
      },
      error: (error: any) => {
        console.error('Error fetching hotels:', error);
      }
    });
  }
 
  onHotelChange() {
    // Reset room type when hotel changes
    this.selectedRoomType = '';
    this.roomTypes = [];
 
    if (this.selectedHotel) {
      // Find the selected hotel and get its room types
      const selectedHotelData = this.hotels.find(hotel => hotel.hotelName === this.selectedHotel);
      console.log('Selected hotel data:', selectedHotelData);
      if (selectedHotelData && selectedHotelData.roomType) {
        this.roomTypes = selectedHotelData.roomType;
      } else {
        // Fallback room types if not available in hotel data
        this.roomTypes = ['Single', 'Double', 'Delux', 'Twin', 'Suite'];
      }
     
      console.log('Room types for', this.selectedHotel, ':', this.roomTypes);
    }
  }
 
  onSubmit(form: any) {
    const createGuest = {
      name: this.fullName,
      email: this.email,
      phone: this.phone,
      guestDetails: {
        numberOfPeople: this.numberOfGuests,
        numberOfRooms: this.numberOfRooms,
      }
    }
 
    const bookingData = {
      userId: sessionStorage.getItem('userId'),
      hotelName: this.selectedHotel,
      phone: this.phone,
      guests: createGuest,
      startDate: this.startDate,
      endDate: this.endDate,
    }
 
    console.log('Submitting booking data:', bookingData);
         
    this.userService.createBookingByManager(bookingData).subscribe({
      next: (response: any) => {
        const bookingId = response._id;
        this.currentBookingId = bookingId;
        this.isBookingCreated = true; // Enable download button
        alert(`User booking created successfully! Booking ID: ${bookingId}`);
       
        this.showFormErrors = false;
      },
      error: (error: any) => {
        console.error('Error creating user booking:', error);
        this.isBookingCreated = false; // Keep download button disabled
        alert('Failed to create user booking. Please try again.');
      }
    });
  }
 
  downloadInvoice() {
    // Only proceed if booking is created
    if (!this.isBookingCreated) {
      alert('Please create a booking first before downloading the invoice.');
      return;
    }
 
    // Prepare the invoice data from the current form
    const invoiceData = {
      hotelName: this.selectedHotel || 'N/A',
      bookingDate: new Date().toISOString().split('T')[0],
      guestName: this.fullName || 'N/A',
      rooms: this.numberOfRooms || 1,
      bookingId: this.currentBookingId,
      numberOfNights: this.getNumberOfNights()
    };
 
    console.log('Downloading invoice with data:', invoiceData);
 
    this.userService.downloadInvoice(invoiceData).subscribe({
      next: (blob: Blob) => {
        // Create a download link and trigger download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice_${this.currentBookingId}_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        console.log('Invoice downloaded successfully');
      },
      error: (error: any) => {
        console.error('Error downloading invoice:', error);
        alert('Failed to download invoice. Please try again.');
      }
    });
  }
 
  // areDatesValid(): boolean {
  //   if (!this.startDate || !this.endDate) return false;
  //   const checkIn = new Date(this.startDate);
  //   const checkOut = new Date(this.endDate);
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
   
  //   return checkIn >= today && checkOut > checkIn;
  // }
 
  getNumberOfNights(): number {
    if (!this.startDate || !this.endDate) return 0;
    const checkIn = new Date(this.startDate);
    const checkOut = new Date(this.endDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
 
  // onClose() {
  //   this.close.emit();
  // }
 
  goBackToDashboard() {
    this.router.navigate(['/manager/dashboard']);
  }
}