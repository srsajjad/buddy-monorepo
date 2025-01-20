export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}
