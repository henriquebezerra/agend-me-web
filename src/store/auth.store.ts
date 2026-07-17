'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User } from '@/types';
import { STORAGE_KEYS } from '@/constants';

const setAuthCookie = (token: string) => {
  document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=${token}; path=/; SameSite=Lax`;
};

const clearAuthCookie = () => {
  document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=; path=/; max-age=0`;
};

// ============================================================
// Auth Store — manages authentication state globally
// ============================================================

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      setToken: (token) => set({ token }),

      login: (user) => {
        if (user.token) setAuthCookie(user.token);
        set({
          user,
          token: user.token ?? null,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        clearAuthCookie();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
