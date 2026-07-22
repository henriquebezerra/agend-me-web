export interface EnderecoDTO {
  rua: string;
  bairro: string;
  numero: number;
  cidade: string;
  estado: string;
  complemento?: string;
}

export interface Establishment {
  id: number;
  nome: string;
  star: number;
  avatar?: string;
  endereco: EnderecoDTO;
  uuidStorage?: string;
}

export type EstablishmentForm = {
  establishmentName?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  complement?: string;
};
