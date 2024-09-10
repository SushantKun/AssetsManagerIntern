import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api`;
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  private userSubject = new BehaviorSubject<User | null>(null);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadStoredUserData();
    }
  }

  private loadStoredUserData(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userData = localStorage.getItem(this.userKey);

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        if (this.isTokenValid(token)) {
          this.userSubject.next(user);
        } else {
          this.clearAuthData();
        }
      } catch (e) {
        this.clearAuthData();
      }
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Check if token is expired
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expirationTime;
    } catch (e) {
      return false;
    }
  }

  private clearAuthData(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      this.userSubject.next(null);
    }
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(response => {
          if (this.isBrowser && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem(this.userKey, JSON.stringify(response.user));
            this.userSubject.next(response.user);
          }
        })
      );
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, { username, email, password });
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    
    const token = localStorage.getItem(this.tokenKey);
    if (token && this.isTokenValid(token)) {
      return token;
    }
    
    // If token is invalid or expired, clear auth data and return null
    this.clearAuthData();
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getCurrentUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  private getUserFromToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.userId,
        username: payload.username,
        email: payload.email
      };
    } catch (e) {
      return null;
    }
  }

  updateProfile(profileData: ProfileUpdateData): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/profile`, profileData).pipe(
      tap(updatedUser => {
        // Update the stored user data
        if (this.isBrowser) {
          const currentUser = this.userSubject.value;
          const mergedUser = { ...currentUser, ...updatedUser };
          localStorage.setItem(this.userKey, JSON.stringify(mergedUser));
          this.userSubject.next(mergedUser);
        }
      }),
      catchError(this.handleError)
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/change-password`, {
      currentPassword,
      newPassword
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
} 