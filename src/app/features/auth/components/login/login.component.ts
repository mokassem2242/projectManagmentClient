import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  showToastMessage(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials: LoginRequest = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response?.isAuthenticated) {
            // Save token if needed
            localStorage.setItem('token', response.token);
            this.showToastMessage('تم تسجيل الدخول بنجاح', 'success');
            this.router.navigate(['/dashboard']);
          } else {
            this.showToastMessage('فشل في تسجيل الدخول. يرجى التحقق من بياناتك', 'error');
          }
        },
        error: (error) => {
          this.showToastMessage('حدث خطأ أثناء تسجيل الدخول', 'error');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field?.errors?.['required']) {
        return 'هذا الحقل مطلوب';
      }
      if (field?.errors?.['email']) {
        return 'يرجى إدخال بريد إلكتروني صحيح';
      }
      if (field?.errors?.['minlength']) {
        return `يجب أن يكون طول كلمة المرور ${field.errors['minlength'].requiredLength} أحرف على الأقل`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field?.invalid && field?.touched ? true : false;
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field?.valid && field?.touched ? true : false;
  }
} 