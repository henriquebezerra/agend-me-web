// ============================================================
// Appointment Feature — Types
// ============================================================

import { type AppointmentStatus } from '@/constants';

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  professionalId: string;
  professionalName: string;
  date: string;        // ISO date string: "2025-07-15"
  time: string;        // "HH:mm"
  duration: number;    // minutes
  status: AppointmentStatus;
  notes?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number;   // minutes
  price: number;
  isActive: boolean;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
}
