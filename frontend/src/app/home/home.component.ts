import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container text-center mt-5">
      <div class="hero-section mb-5">
        <h1 class="display-3 text-primary fw-bold mb-4">Smart Hotel Booking</h1>
        <p class="lead fs-4 text-muted mb-5">Discover and book your perfect hotel stay with ease</p>
        
        <!-- Features Section -->
        <div class="row mb-5">
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="bi bi-search text-primary fs-1 mb-3"></i>
                <h5 class="card-title">Easy Search</h5>
                <p class="card-text text-muted">Find hotels by location, price, and amenities</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="bi bi-shield-check text-success fs-1 mb-3"></i>
                <h5 class="card-title">Secure Booking</h5>
                <p class="card-text text-muted">Safe and secure payment processing</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="bi bi-clock text-warning fs-1 mb-3"></i>
                <h5 class="card-title">24/7 Support</h5>
                <p class="card-text text-muted">Round-the-clock customer assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="footer mt-5 py-4">
      <div class="container">
        <div class="row mb-4">
          <div class="col-md-4 mb-4">
            <h5 class="fw-bold mb-3">
              <i class="bi bi-building text-primary"></i> Smart Hotel
            </h5>
            <p class="text-muted small">Your trusted partner in finding and booking the perfect hotel accommodation.</p>
          </div>
          <div class="col-md-4 mb-4">
            <h6 class="fw-bold mb-3">Quick Links</h6>
            <ul class="list-unstyled">
              <li><a (click)="scrollToTop()" class="footer-link small">Home</a></li>
              <li><a (click)="navigateToAbout()" class="footer-link small">About Us</a></li>
              <li><a (click)="navigateToContact()" class="footer-link small">Contact Us</a></li>
              <li><a (click)="navigateToLogin()" class="footer-link small">Login</a></li>
            </ul>
          </div>
          <div class="col-md-4 mb-4">
            <h6 class="fw-bold mb-3">Follow Us</h6>
            <div class="social-links">
              <a href="#" class="footer-link me-3"><i class="bi bi-facebook"></i></a>
              <a href="#" class="footer-link me-3"><i class="bi bi-twitter"></i></a>
              <a href="#" class="footer-link me-3"><i class="bi bi-instagram"></i></a>
              <a href="#" class="footer-link"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
        <hr class="bg-light opacity-25">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="text-muted small mb-0">&copy; 2025 Smart Hotel Booking. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-md-end">
            
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #b8c6db 0%, #a4b0bd 100%);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      margin-top: auto;
      color: #2c3e50;
    }
    
    .footer-link {
      color: #2c3e50;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .footer-link:hover {
      color: #0066cc;
      text-decoration: underline;
      font-weight: 500;
    }
    
    .social-links a:hover {
      color: #0066cc !important;
      transform: translateY(-3px);
      transition: all 0.3s ease;
    }
    
    footer h5, footer h6 {
      color: #2c3e50;
    }
    
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToAbout() {
    // Navigate to about page if exists, or show message
    alert('About Us page coming soon!');
  }

  navigateToContact() {
    // Navigate to contact page if exists, or show message
    alert('Contact Us page coming soon!');
  }

  navigateToLogin() {
    this.router.navigate(['/guest-login']);
  }
}
