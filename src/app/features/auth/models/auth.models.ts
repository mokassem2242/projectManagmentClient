export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface AuthResponse {
  id: string;
  firstName: string;
  fristName?: string;
  lastName: string;
  phoneNumber: string;
  profileImagePath: string | null;
  isAuthenticated: boolean;
  email: string;
  roles: string[];
  token: string;
  message: string;
  expiresOn: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImagePath: string | null;
  email: string;
  roles: string[];
} 