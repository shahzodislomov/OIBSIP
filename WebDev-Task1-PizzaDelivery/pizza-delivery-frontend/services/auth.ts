import { api } from '@/lib/api';
import type { LoginData, RegisterData, AuthResponse } from '@/types/auth';

export const register =  async (
    data: RegisterData
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
}

export const login = async (
    data: LoginData
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
}

export const verifyEmail = async (token: string) => {
    const response = await api.get('/auth/verify-email', {
        params: { token },
    })
    return response.data;
}