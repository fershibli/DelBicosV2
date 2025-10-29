export interface Address {
  id: number;
  lat: number;
  lng: number;
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  country_iso: string;
  postal_code: string;
  user_id?: number;
  active?: boolean;
  isPrimary?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressStore {
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
  fetchAddressesByUserId: (userId: number) => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: number, data: Partial<Address>) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  setPrimaryAddress: (id: number) => Promise<void>;
}
