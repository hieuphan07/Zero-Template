export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: string;
}

export interface LoginFormType {
  setToRegister: (toRegister: boolean) => void;
}

export interface ApiResponse {
  message: string;
  statusCode: number;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  // Add other fields that your backend returns
}

export interface ApiError {
  message?: string;
  code?: string;
  status?: number;
}

export interface FormErrors {
  username?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  phoneNumber?: boolean;
}

export interface JwtPayload {
  exp: number;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}
