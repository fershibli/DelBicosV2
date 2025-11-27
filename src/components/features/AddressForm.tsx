import React, { useState } from 'react';
import { useViaCepStore } from '@stores/ViaCep';

interface AddressFormProps {
  onSubmit: (data: any) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { fetchCep, loading } = useViaCepStore();

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCep(value);
    if (value.replace(/\D/g, '').length === 8) {
      const data = await fetchCep(value);
      if (data) {
        setStreet(data.logradouro || '');
        setCity(data.localidade || '');
        setState(data.uf || '');
        setNeighborhood(data.bairro || '');
        setError(null);
      } else {
        setError('CEP não encontrado ou inválido.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cep,
      street,
      city,
      state,
      neighborhood,
      number,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        CEP:
        <input
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
          placeholder="00000-000"
        />
      </label>
      <label>
        Rua:
        <input value={street} onChange={(e) => setStreet(e.target.value)} />
      </label>
      <label>
        Cidade:
        <input value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <label>
        Estado:
        <input value={state} onChange={(e) => setState(e.target.value)} />
      </label>
      <label>
        Bairro:
        <input
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </label>
      <label>
        Número:
        <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </label>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>
        Salvar
      </button>
    </form>
  );
};
