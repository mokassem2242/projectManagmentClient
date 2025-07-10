import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../auth/models/auth.models';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private readonly authService = inject(AuthService);
  user: User | null = this.authService.currentUser();
} 