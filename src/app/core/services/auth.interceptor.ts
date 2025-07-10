import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly authService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get token from AuthService (signal) or fallback to localStorage
        const token = this.authService.getAuthToken() ?? localStorage.getItem('auth_token');
        // Exclude auth endpoints
        const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/Auth/register');
        if (token && !isAuthRequest) {
            const authReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}