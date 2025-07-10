import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { LoginRequest, SignupRequest, AuthResponse, User } from '../models/auth.models';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  apiUrl=environment.apiUrl;
  // Using signals for reactive state management
  private readonly _currentUser = signal<User | null>(null);
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _token = signal<string | null>(null);

  // Public readonly signals
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly currentUser = this._currentUser.asReadonly();
  readonly token = this._token.asReadonly();

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');
    
    if (token && user) {
      this._token.set(token);
      this._currentUser.set(JSON.parse(user));
      this._isAuthenticated.set(true);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    
    if (!this.apiUrl) {
      throw new Error('API URL is not loaded');
    }
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        this.handleAuthSuccess(response);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of(null as any);
      })
    );
  }

  signup(userData: SignupRequest): Observable<AuthResponse> {
  
    if (!this.apiUrl) {
      throw new Error('API URL is not loaded');
    }
    return this.http.post<AuthResponse>(`${this.apiUrl}/Auth/register`, userData).pipe(
      tap((response) => {
        this.handleAuthSuccess(response);
      }),
      catchError((error) => {
        console.error('Signup error:', error);
        return of(null as any);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this._token.set(null);
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    const user: User = {
      id: response.id,
      firstName: response.firstName ?? response.fristName, // fallback for backend typo
      lastName: response.lastName,
      phoneNumber: response.phoneNumber,
      profileImagePath: response.profileImagePath,
      email: response.email,
      roles: response.roles,
    };
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    this._token.set(response.token);
    this._currentUser.set(user);
    this._isAuthenticated.set(true);
  }

  getAuthToken(): string | null {
    return this._token();
  }

  isLoggedIn(): boolean {
    return this._isAuthenticated();
  }
} 