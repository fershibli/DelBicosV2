import { useCallback, useState } from 'react';
import { AddressData } from '../types/types';

// 🔑 IMPORTANTE: Substitua pela sua API Key do LocationIQ
// Para segurança, use variáveis de ambiente: process.env.LOCATIONIQ_API_KEY
const LOCATIONIQ_API_KEY = 'pk.0a31f590fd3984df9fe561d3f0075324';

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
      // Formatação customizada
      display_name: components.display_name || formattedAddress,
      formatted: formattedAddress,

      // Dados brutos do LocationIQ
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

      // Componentes brasileiros
      road,
      neighbourhood,
      city,
      state,
      postcode: cep,
      house_number: houseNumber,

      // Backup com todos os componentes
      ...components,
    };
  } catch (error) {
    console.error('Erro ao formatar endereço brasileiro:', error);
    // Fallback para display_name original
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

  // Remove caracteres não numéricos
  const cleanCep = cep.replace(/\D/g, '');

  // Se já está no formato correto, retorna
  if (cleanCep.length === 8 && !cep.includes('-')) {
    return `${cleanCep.substring(0, 5)}-${cleanCep.substring(5)}`;
  }

  // Se já tem hífen, retorna como está
  if (cep.includes('-')) {
    return cep;
  }

  return cep;
}

/**
 * Hook para fazer reverse geocoding via LocationIQ com formatação brasileira.
 * - Retorna função `lookup` para buscar endereço por lat/lon.
 * - Formata automaticamente para padrão brasileiro.
 * - Respeita rate limits do LocationIQ (5.000 req/dia no plano free).
 */
export function useReverseGeocode() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(
    async (latitude: number, longitude: number): Promise<AddressData> => {
      setError(null);
      setLoading(true);

      try {
        const url = `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

        console.log('🔍 Buscando endereço para:', {
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6),
        });

        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`LocationIQ respondeu com ${res.status}: ${text}`);
        }

        const json = await res.json();

        if (!json || json.error) {
          throw new Error(json.error?.message || 'Resposta inválida da API');
        }

        // ✅ Formatação brasileira customizada
        const addressData = formatBrazilianAddress(json);

        console.log('📍 Endereço formatado:', {
          original: json.display_name,
          brasileiro: addressData.formatted,
          componentes: {
            rua: addressData.road,
            bairro: addressData.neighbourhood,
            cidade: addressData.city,
            estado: addressData.state,
            cep: addressData.postcode,
          },
        });

        setLoading(false);
        return addressData;
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

  return { lookup, loading, error };
}
