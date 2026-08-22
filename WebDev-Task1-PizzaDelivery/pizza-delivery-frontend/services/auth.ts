import { api } from "@/lib/api";
import type {
  AuthResponse,
  LoginData,
  RegisterData,
} from "@/types/auth";

export const register = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const { data: response } = await api.post<AuthResponse>(
    "/auth/register",
    data
  );

  return response;
};

export const login = async (
  data: LoginData
): Promise<AuthResponse> => {
  const { data: response } = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response;
};

export const verifyEmail = async (token: string) => {
  const { data } = await api.get("/auth/verify-email", {
    params: { token },
  });

  return data;
};