import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { HTTP_DOMAIN } from '@config/varEnvs';

const fallbackBase =
  (typeof window !== 'undefined' && window.location && window.location.origin) ||
  'http://localhost:3333';

export const backendHttpClient = axios.create({
  baseURL: HTTP_DOMAIN || fallbackBase,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

if (!HTTP_DOMAIN) {
  // eslint-disable-next-line no-console
  console.warn(`[httpClient] HTTP_DOMAIN is not set, using fallback baseURL=${backendHttpClient.defaults.baseURL}`);
}

// Simple retry helper for idempotent GET requests (1 retry)
const retryDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Optional external hook to perform sign-out without importing the auth store
let _authSignOutHandler: (() => void) | null = null;
export function registerAuthSignOut(handler: () => void) {
  _authSignOutHandler = handler;
}

import secureStorage from './secureStorage';

export async function getAuthToken(): Promise<string | null> {
  try {
    const token = await secureStorage.getItem('token');
    return token;
  } catch (e) {
    return null;
  }
}

// Request interceptor: inject auth token from secure storage (best-effort)
backendHttpClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();
      if (token) {
        config.headers = {
          ...(config.headers || {}),
          Authorization: `Bearer ${token}`,
        } as any;
      }
    } catch (e) {
      // ignore token read errors
    }
    return config;
  },
  (err) => Promise.reject(err),
);

backendHttpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as AxiosRequestConfig & { _retry?: boolean };

  const status = error.response?.status;
  const respData: any = error.response?.data;

    // Also consider backend envelopes that return a 200 HTTP status but include a code field
    const bodyCode = respData?.code;

    // 401/403 -> call registered sign-out handler if present
    if (status === 401 || status === 403 || bodyCode === 401 || bodyCode === 403) {
      try {
        if (_authSignOutHandler) {
          _authSignOutHandler();
        }
      } catch (e) {
        // swallow errors (do not leak tokens)
        // eslint-disable-next-line no-console
        console.error('Erro ao executar signOut no interceptor');
      }
    }

    // Retry logic for GET requests only, once
    try {
      if (
        originalConfig &&
        originalConfig.method === 'get' &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        // small backoff
        await retryDelay(150);
        return backendHttpClient(originalConfig);
      }
    } catch (retryErr) {
      // ignore retry errors and fall through to reject
    }

    // Normalize the error message to be more friendly
    // response?.data may be any shape; try common fields then fallback
    const normalizedMessage = (respData && (respData.message || respData.error || respData.msg)) || error.message || 'Erro na requisição';
    // attach a normalized message to the error and reject
    (error as any).normalizedMessage = normalizedMessage;

    return Promise.reject(error);
  },
);
