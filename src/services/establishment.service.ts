import api from '@/lib/api/axios';
import type { Establishment } from '@/types/establishment';

const establishmentService = {
  getMyEstablishments: async (): Promise<Establishment[]> => {
    const response = await api.get<Establishment[]>(
      '/estabelecimento/usuario/meus-estabelecimentos',
    );
    return response.data;
  },
};

export default establishmentService;
