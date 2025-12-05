export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string,
  email: string;
  password: string;
  password_confirmation: string;
}
// Interface cho response login
export interface LoginResponse {
  message?: string;
  data: {
    message: string;
    status: string;
    user: {
      id: number;
      email: string;
      name: string;

    };
    access_token: string;
    refresh_token: string;
  };
}
export interface RegisterResponse {
  success: true | false,
  message?: string;
  user?: {
    id: string;
    name?: string;
    email: string;
  }
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
}