export interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export interface LocationData {
  coords: LocationCoords;
  timestamp: number;
}

export interface AddressData {
  // Formatação completa
  display_name: string;
  formatted: string; // Nosso formato customizado brasileiro
  
  // Campos individuais do LocationIQ
  place_id?: string;
  licence?: string;
  osm_type?: string;
  osm_id?: number;
  boundingbox?: string[];
  lat?: string;
  lon?: string;
  class?: string;
  type?: string;
  
  // Componentes do endereço brasileiro
  road?: string;           // Rua/Avenida
  neighbourhood?: string;  // Bairro
  suburb?: string;         // Subúrbio
  city?: string;           // Cidade
  town?: string;           // Cidade pequena
  state?: string;          // Estado
  state_district?: string; // Região administrativa
  country?: string;        // País
  country_code?: string;   // Código do país
  postcode?: string;       // CEP
  house_number?: string;   // Número
  road_number?: string;    // Número da rua
  
  // Campos extras úteis
  formatted_address?: string; // Endereço formatado pelo LocationIQ (backup)
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapComponentProps {
  region: Region | null;
  markerCoords: { latitude: number; longitude: number } | null;
  address?: AddressData;
  onMapPress: (event: any) => void;
}