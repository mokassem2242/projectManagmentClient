import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    title: 'تسجيل الدخول'
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent),
    title: 'إنشاء حساب جديد'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]; 