export const handleLocation = (city: string, country: string) => {
  console.log(`Localização via GPS: ${city}, ${country}`);
};

export const handleCep = (city: string, state: string) => {
  console.log(`Localização via CEP: ${city}, ${state}`);
};

export const handleLogin = () => {
  console.log('Login button pressed');
};
