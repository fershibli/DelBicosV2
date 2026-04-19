import axios from 'axios';
import { HTTP_DOMAIN } from '@config/varEnvs';

let getToken: (() => string | null) | null = null;

export const registerTokenProvider = (provider: () => string | null) => {
  getToken = provider;
};

export const backendHttpClient = axios.create({
  baseURL: `${HTTP_DOMAIN}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

backendHttpClient.interceptors.request.use(
  (config) => {
    const token = getToken ? getToken() : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to log failing requests for easier debugging (temporary)
backendHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const cfg = error?.config || {};
      const resp = error?.response || {};
      console.error('[HTTP] Request failed', {
        url: cfg.url,
        method: cfg.method,
        params: cfg.params,
        data: cfg.data,
        status: resp.status,
        responseBody: resp.data,
      });
    } catch (e) {
      console.error('[HTTP] Error logging failed request', e);
    }

    return Promise.reject(error);
  },
);
