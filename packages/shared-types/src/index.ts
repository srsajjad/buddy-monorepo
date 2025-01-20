export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type UserUpdatePayload = Partial<
  Omit<User, "uid" | "createdAt" | "updatedAt">
>;

export const USER_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_DISPLAY_NAME_LENGTH: 2,
  MAX_DISPLAY_NAME_LENGTH: 50,
} as const;
