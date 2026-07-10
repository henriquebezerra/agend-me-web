// ============================================================
// Global TypeScript Types & Interfaces
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'professional' | 'client';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface SelectOption {
  label: string;
  value: string;
}
