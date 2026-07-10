import { z } from 'zod';

// ============================================================
// Auth Validations
// ============================================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Nome deve ter no mínimo 2 caracteres')
      .max(100, 'Nome muito longo'),
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('E-mail inválido'),
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
      .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

// ============================================================
// Appointment Validations
// ============================================================

export const appointmentSchema = z.object({
  clientId: z.string().min(1, 'Cliente é obrigatório'),
  serviceId: z.string().min(1, 'Serviço é obrigatório'),
  professionalId: z.string().min(1, 'Profissional é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),
  time: z.string().min(1, 'Horário é obrigatório'),
  notes: z.string().optional(),
});

// ============================================================
// Client Validations
// ============================================================

export const clientSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .max(15, 'Telefone inválido')
    .regex(/^[\d\s\(\)\-\+]+$/, 'Telefone inválido'),
  notes: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AppointmentFormData = z.infer<typeof appointmentSchema>;
export type ClientFormData = z.infer<typeof clientSchema>;
