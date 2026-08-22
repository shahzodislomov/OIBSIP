export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role?: string;
  isAdmin?: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}