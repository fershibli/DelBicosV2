export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

export interface ViaCepState {
  loading: boolean;
  error: string | null;
  fetchCep: (cep: string) => Promise<ViaCepResponse | null>;
}
