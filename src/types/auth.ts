export interface CheckEmailResponse {
  success: boolean;
  available: boolean;
  message: string;
}

export interface CheckNicknameResponse {
  success: boolean;
  available: boolean;
  message: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  error?: {
    message: string;
    statusCode: number;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
  error?: {
    message: string;
  };
}
