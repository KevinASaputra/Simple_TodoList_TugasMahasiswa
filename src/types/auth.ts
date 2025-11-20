export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}
