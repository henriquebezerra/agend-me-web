import { z } from 'zod';
import type { TFunction } from 'i18next';

// ============================================================
// Auth Validations
// ============================================================

export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z.string().trim().min(1, t('validation.emailRequired')).email(t('validation.emailInvalid')),
    password: z.string().trim().min(1, t('validation.passwordRequired')),
  });

export const createRegisterSchema = (t: TFunction) =>
  z.object({
    nome: z
      .string()
      .min(2, t('validation.nameMin', { count: 2 }))
      .max(100, t('validation.nameMax')),
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .email(t('validation.emailInvalid')),
    password: z
      .string()
      .min(8, t('validation.passwordMin', { count: 8 }))
      .regex(/[A-Z]/, t('validation.passwordUppercase'))
      .regex(/[0-9]/, t('validation.passwordNumber')),
  });

// ============================================================
// Appointment Validations
// ============================================================

export const createAppointmentSchema = (t: TFunction) =>
  z.object({
    clientId: z.string().min(1, t('validation.clientRequired')),
    serviceId: z.string().min(1, t('validation.serviceRequired')),
    professionalId: z.string().min(1, t('validation.professionalRequired')),
    date: z.string().min(1, t('validation.dateRequired')),
    time: z.string().min(1, t('validation.timeRequired')),
    notes: z.string().optional(),
  });

// ============================================================
// Client Validations
// ============================================================

export const createClientSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(2, t('validation.nameMin', { count: 2 })),
    email: z.string().email(t('validation.emailInvalid')).optional().or(z.literal('')),
    phone: z
      .string()
      .min(10, t('validation.phoneInvalid'))
      .max(15, t('validation.phoneInvalid'))
      .regex(/^[\d\s\(\)\-\+]+$/, t('validation.phoneInvalid')),
    notes: z.string().optional(),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
export type AppointmentFormData = z.infer<ReturnType<typeof createAppointmentSchema>>;
export type ClientFormData = z.infer<ReturnType<typeof createClientSchema>>;
