import api from "./api";

import {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
} from "@/types/auth";

export async function login(data: LoginRequest) {
  const response = await api.post<TokenResponse>(
    "/auth/login",
    data
  );

  return response.data;
}

export async function register(data: RegisterRequest) {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");

  return response.data;
}