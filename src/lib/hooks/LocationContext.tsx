import React, { createContext, useContext, useState, useCallback } from 'react';
import { AddressData } from './types';

const LOCATIONIQ_API_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY || '';

if (!LOCATIONIQ_API_KEY) {
  console.warn(
    '⚠️ A chave da API LocationIQ não está definida no arquivo .env (EXPO_PUBLIC_LOCATIONIQ_API_KEY)',
  );
}

interface LocationContextType {
  address: AddressData | null;
  city: string | undefined;
  state: string | undefined;
  setLocation: (city: string, state: string) => void;
  lookupByCoordinates: (latitude: number, longitude: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

/**
 * Função para formatar endereço brasileiro
 * Formato: "Rua/Avenida Bairro, Cidade - Estado, CEP XXXXX-XXX"
 */
function formatBrazilianAddress(data: any): AddressData {
  try {
    const components = data.address || {};

    // Cidade (prioridade: city > town > suburb)
    const city =
      components.city ||
      components.town ||
      components.suburb ||
      components.village ||
      '';

    // Estado (prioridade: state > state_district)
    const state = components.state || components.state_district || '';

    // Bairro (prioridade: neighbourhood > suburb)
    const neighbourhood = components.neighbourhood || components.suburb || '';

    // Rua (prioridade: road > street > pedestrian)
    const road =
      components.road || components.street || components.pedestrian || '';

    // Número da casa
    const houseNumber = components.house_number || components.road_number || '';

    // CEP
    const cep = components.postcode || '';

    // Construir endereço formatado
    let formattedParts: string[] = [];

    // Rua + Número
    if (road) {
      const streetPart = houseNumber ? `${road}, ${houseNumber}` : road;
      formattedParts.push(streetPart);
    }

    // Bairro
    if (neighbourhood && neighbourhood !== city) {
      formattedParts.push(neighbourhood);
    }

    // Cidade - Estado
    if (city) {
      const locationPart = state ? `${city} - ${state}` : city;
      formattedParts.push(locationPart);
    }

    // CEP
    if (cep) {
      const formattedCep = formatCEP(cep);
      formattedParts.push(formattedCep);
    }

    // Montar endereço final
    const formattedAddress =
      formattedParts.length > 0
        ? formattedParts.join(', ')
        : components.display_name || 'Endereço não identificado';

    // Retornar todos os dados com formatação customizada
    return {
      display_name: components.display_name || formattedAddress,
      formatted: formattedAddress,
      place_id: data.place_id,
      licence: data.licence,
      osm_type: data.osm_type,
      osm_id: data.osm_id,
      boundingbox: data.boundingbox,
      lat: data.lat,
      lon: data.lon,
      class: data.class,
      type: data.type,
      formatted_address: components.display_name,
      road,
      neighbourhood,
      city,
      state,
      postcode: cep,
      house_number: houseNumber,
      ...components,
    };
  } catch (error) {
    console.error('Erro ao formatar endereço brasileiro:', error);
    return {
      display_name: data.display_name || 'Endereço não identificado',
      formatted: data.display_name || 'Endereço não identificado',
      ...data,
    };
  }
}

/**
 * Formata CEP para padrão brasileiro XXXXX-XXX
 */
function formatCEP(cep: string): string {
  if (!cep) return '';
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length === 8 && !cep.includes('-')) {
    return `${cleanCep.substring(0, 5)}-${cleanCep.substring(5)}`;
  }
  if (cep.includes('-')) {
    return cep;
  }
  return cep;
}

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<AddressData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setLocation = (city: string, state: string) => {
    setAddress({
      ...address,
      city,
      state,
      formatted: `${city} - ${state}`,
      display_name: `${city} - ${state}`,
      lat: address?.lat || 0,
      lng: address?.lng || 0,
      street: address?.street || '',
      number: address?.number || '',
      neighborhood: address?.neighbourhood || '',
      postal_code: address?.postcode || '',
      country_iso: address?.country_iso || '',
      lon: address?.lon || address?.lng || '0',
    } as AddressData);
  };

  const lookupByCoordinates = useCallback(
    async (latitude: number, longitude: number): Promise<void> => {
      if (!LOCATIONIQ_API_KEY) {
        const errorMessage =
          'Chave da API LocationIQ não configurada (EXPO_PUBLIC_LOCATIONIQ_API_KEY)';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      setError(null);
      setLoading(true);

      try {
        const url = `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`LocationIQ respondeu com ${res.status}: ${text}`);
        }

        const json = await res.json();

        if (!json || json.error) {
          throw new Error(json.error?.message || 'Resposta inválida da API');
        }

        const addressData = formatBrazilianAddress(json);

        setAddress(addressData);
        setLoading(false);
      } catch (err: any) {
        const errorMessage =
          err?.message ?? 'Erro desconhecido no reverse geocoding';
        console.error('❌ Erro no geocoding:', errorMessage);
        setError(errorMessage);
        setLoading(false);
        throw new Error(errorMessage);
      }
    },
    [],
  );

  const currentCity = address?.city;
  const currentState = address?.state;

  return (
    <LocationContext.Provider
      value={{
        address,
        city: currentCity,
        state: currentState,
        setLocation,
        lookupByCoordinates,
        loading,
        error,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation deve ser usado dentro de um LocationProvider');
  }
  return context;
};
