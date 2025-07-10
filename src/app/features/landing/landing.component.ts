import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  private readonly router = inject(Router);

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignup(): void {
    this.router.navigate(['/auth/signup']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
} 