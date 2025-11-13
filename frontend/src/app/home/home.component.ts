import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
