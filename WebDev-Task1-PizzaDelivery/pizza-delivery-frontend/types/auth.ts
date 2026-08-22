export interface User {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
}
export interface AuthResponse {
    message: string;
    user: User;
    token: string;
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