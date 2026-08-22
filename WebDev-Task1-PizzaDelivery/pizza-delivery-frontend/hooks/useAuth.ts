"use client"

import { useMutation } from '@tanstack/react-query'
import { login, register } from '../services/auth'
import { useAuthStore } from '../stores/authStore'
import type { LoginData, RegisterData } from '../types/auth'

export function useLogin() {
    const setAuth = useAuthStore((state) => state.setAuth)

    return useMutation({
        mutationFn: async (data: LoginData) => login(data),
        onSuccess: (data) => {
            setAuth(data.user, data.token)
        }
    });
}
export function useRegister() {
    return useMutation({
        mutationFn: async (data: RegisterData) => register(data)
    })
}