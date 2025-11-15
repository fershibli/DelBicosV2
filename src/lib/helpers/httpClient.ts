import axios from 'axios';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { useUserStore } from '@stores/User';

export const backendHttpClient = axios.create({
  baseURL: `${HTTP_DOMAIN}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

backendHttpClient.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;

    // Se o token existir, anexa ele no header de Autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
