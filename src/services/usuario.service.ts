import api from '@/lib/api/axios';
import { type User } from '@/types';

export interface CreateUsuarioPayload {
  nome: string;
  email: string;
  password: string;
}

const usuarioService = {
  create: async (payload: CreateUsuarioPayload): Promise<User> => {
    const {password, ...rest} = payload;
    const response = await api.post<User>('/usuario', {
      ...rest,
      senha: payload.password,
    });
    return response.data;
  },
};

export default usuarioService;
