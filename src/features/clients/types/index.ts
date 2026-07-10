// ============================================================
// Clients Feature — Types
// ============================================================

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone: string;
  notes?: string;
  totalAppointments: number;
  lastAppointmentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientListFilters {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'createdAt' | 'lastAppointmentAt';
  sortOrder?: 'asc' | 'desc';
}
