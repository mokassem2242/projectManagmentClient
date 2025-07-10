import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/services/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  readonly isMenuOpen = signal(false);

  // Make this public so the template can access it
  public readonly authService = inject(AuthService);
  public readonly isAuthenticated = this.authService.isAuthenticated;

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }
} 