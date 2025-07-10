import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, RouterModule],
  template: `
    <div class="min-h-screen container mx-auto bg-gray-50 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-end mb-4">
          <button (click)="goToProfile()" class="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg shadow hover:bg-blue-100 transition font-medium">
            <i class="fas fa-user"></i>
            <span>عرض الملف الشخصي</span>
          </button>
        </div>
        <p-card>
          <div class="text-center py-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">مرحباً بك في نظام إدارة المشاريع</h2>
            <p class="text-gray-600 mb-6">تم تسجيل دخولك بنجاح</p>
          </div>
        </p-card>
      </div>
      <!-- Project & Task Cards Section -->
      <div class="mt-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
          <!-- Project Card -->
          <button (click)="navigateToProjects()" aria-label="إدارة المشاريع" class="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500 flex flex-col items-end p-8 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-purple-400 to-indigo-400 opacity-20"></div>
            <div class="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full p-5 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-folder-open fa-2x"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">المشاريع</h3>
            <p class="text-gray-600 text-right mb-1">إدارة جميع مشاريعك بسهولة وتتبع تقدمها في مكان واحد</p>
            <span class="text-xs text-purple-500 font-semibold mt-2">إدارة المشاريع</span>
          </button>
          <!-- Task Card -->
          <button disabled aria-label="إدارة المهام" class="group bg-white rounded-3xl shadow-lg border-t-4 border-indigo-200 flex flex-col items-end p-8 relative overflow-hidden opacity-60 cursor-not-allowed focus:outline-none">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-indigo-200 to-purple-200 opacity-10"></div>
            <div class="bg-gradient-to-br from-indigo-300 to-purple-300 text-white rounded-full p-5 mb-6 shadow-lg">
              <i class="fas fa-tasks fa-2x"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">المهام</h3>
            <p class="text-gray-400 text-right mb-1">أنشئ وأدر المهام الخاصة بكل مشروع بسهولة وفعالية</p>
            <span class="text-xs text-indigo-300 font-semibold mt-2">إدارة المهام</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      direction: rtl;
      text-align: right;
    }
  `]
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  navigateToProjects(): void {
    // TODO: Update with real route when available
    this.router.navigate(['/projects']);
  }

  navigateToTasks(): void {
    // TODO: Update with real route when available
    this.router.navigate(['/dashboard']);
  }
} 