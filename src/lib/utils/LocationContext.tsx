import React, { createContext, useContext, useState } from 'react';

interface LocationContextType {
  city: string;
  state: string;
  setLocation: (city: string, state: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const setLocation = (newCity: string, newState: string) => {
    setCity(newCity);
    setState(newState);
  };

  return (
    <LocationContext.Provider value={{ city, state, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
