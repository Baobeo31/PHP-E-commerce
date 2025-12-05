// src/services/UserService.ts
import axios from "axios";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResendVerificationRequest, ResendVerificationResponse } from "../types/user";

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(
    `${import.meta.env.VITE_API_URL}/api/users/login`,
    data
  );
  return res.data;
};
export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const res = await axios.post<RegisterResponse>(
    `${import.meta.env.VITE_API_URL}/api/users/create`,
    data,
    { withCredentials: true }
  );
  return res.data;
};

export const resendVerificationEmail = async (data: ResendVerificationRequest): Promise<ResendVerificationResponse> => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/resend-verification`, data);
  return res.data;
};

export const verifyEmail = async ({ id, token }: { id: string; token: string }) => {
  const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/users/verify-email/${id}/${token}`
);
  return res.data;
};

