export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginFormType {
  setToRegister: (toRegister: boolean) => void;
}

export interface ApiResponse {
  message: string;
  statusCode: number;
}
