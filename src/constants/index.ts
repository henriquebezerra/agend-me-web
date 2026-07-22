// ============================================================
// Application-wide Constants
// ============================================================

export const APP_NAME = 'AgendMe';
export const APP_DESCRIPTION = 'Plataforma de agendamento inteligente';
export const APP_VERSION = '0.1.0';

// API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8082';
export const API_TIMEOUT = 10000; // 10s

// Pagination
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

// Date/Time
export const DATE_FORMAT = 'dd/MM/yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@agend-me-web:token',
  REFRESH_TOKEN: '@agend-me-web:refresh_token',
  USER: '@agend-me-web:user',
  THEME: '@agend-me-web:theme',
  LANGUAGE: '@agend-me-web:language',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SCHEDULING: '/dashboard/scheduling',
  APPOINTMENTS: '/dashboard/appointments',
  CLIENTS: '/dashboard/clients',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/profile',
} as const;

// Status Labels
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no_show',
} as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS];
