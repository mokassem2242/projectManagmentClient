import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignupRequest } from '../../models/auth.models';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  signupForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const userData: SignupRequest = this.signupForm.value;

      this.authService.signup(userData).subscribe({
        next: (response) => {
          if (response) {
            this.showSuccessMessage('تم إنشاء الحساب بنجاح');
            this.router.navigate(['/dashboard']);
          } else {
            this.showErrorMessage('فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى');
          }
        },
        error: (error) => {
          this.showErrorMessage('حدث خطأ أثناء إنشاء الحساب');
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
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field?.errors?.['required']) {
        return 'هذا الحقل مطلوب';
      }
      if (field?.errors?.['email']) {
        return 'يرجى إدخال بريد إلكتروني صحيح';
      }
      if (field?.errors?.['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        if (fieldName === 'password') {
          return `يجب أن تكون كلمة المرور ${minLength} أحرف على الأقل`;
        }
        return `يجب أن يكون طول الحقل ${minLength} أحرف على الأقل`;
      }
      if (field?.errors?.['pattern']) {
        return 'يرجى إدخال رقم هاتف صحيح';
      }
    }
    return '';
  }

  getPasswordMatchError(): string {
    if (this.signupForm.errors?.['passwordMismatch'] && 
        this.signupForm.get('confirmPassword')?.touched) {
      return 'كلمات المرور غير متطابقة';
    }
    return '';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private showSuccessMessage(message: string): void {
    // Simple alert for now - you can replace with a toast library
    alert(message);
  }

  private showErrorMessage(message: string): void {
    // Simple alert for now - you can replace with a toast library
    alert(message);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return field ? field.valid && field.touched : false;
  }
} 