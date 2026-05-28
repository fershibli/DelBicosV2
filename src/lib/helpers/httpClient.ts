import axios from 'axios';
import { HTTP_DOMAIN } from '@config/varEnvs';

let getToken: (() => string | null) | null = null;
let logoutHandler: (() => void) | null = null;

export const registerTokenProvider = (provider: () => string | null) => {
  getToken = provider;
};

export const getAuthToken = () => (getToken ? getToken() : null);

export const registerLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};
console.log(HTTP_DOMAIN);
export const backendHttpClient = axios.create({
  baseURL: `${HTTP_DOMAIN}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

// Debug: ensure axios baseURL is visible and provide a temporary fallback
console.log('axios baseURL (before):', backendHttpClient.defaults.baseURL);
if (!backendHttpClient.defaults.baseURL) {
  // fallback for debugging on Android emulator
  backendHttpClient.defaults.baseURL = 'http://10.0.2.2:3000';
  console.log(
    'axios baseURL set to fallback:',
    backendHttpClient.defaults.baseURL,
  );
}

// If baseURL exists but has no explicit port, append default dev port 3000
(() => {
  const base = backendHttpClient.defaults.baseURL || '';
  if (base && /^https?:\/\/[^:\/]+(?:\/.*)?$/.test(base)) {
    // no port present after host — append default dev port
    backendHttpClient.defaults.baseURL = `${base.replace(/\/$/, '')}:3000`;
    console.log(
      'axios baseURL appended default port:',
      backendHttpClient.defaults.baseURL,
    );
  }
})();

backendHttpClient.interceptors.request.use(
  (config) => {
    let token = getToken ? getToken() : null;

    if (typeof token === 'string') token = token.trim();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      // request debug logging removed
    } catch (e) {
      // ignore
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to log failed responses for debugging (403/401/etc.)
backendHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const token = getToken ? getToken() : null;
      console.error('HTTP Error Interceptor:', {
        url: error?.config?.url,
        method: error?.config?.method,
        status: error?.response?.status,
        responseData: error?.response?.data,
        headers: error?.config?.headers,
        tokenPresent: !!token,
        baseURL: backendHttpClient.defaults.baseURL,
      });

      // If backend explicitly returned "Token inválido", attempt to decode the JWT for debugging
      const msg = error?.response?.data?.msg || error?.response?.data?.message;
      if (
        error?.response?.status === 403 &&
        typeof msg === 'string' &&
        msg.toLowerCase().includes('token')
      ) {
        try {
          const authHeader =
            error?.config?.headers?.Authorization ||
            error?.config?.headers?.authorization;
          if (authHeader && typeof authHeader === 'string') {
            const tokenString = authHeader.replace(/^[Bb]earer\s+/, '').trim();
            const parts = tokenString.split('.');
            if (parts.length >= 2) {
              const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
              const padded =
                payload + '='.repeat((4 - (payload.length % 4)) % 4);
              let decoded = null;
              try {
                if (typeof atob === 'function') {
                  decoded = atob(padded);
                } else if (typeof Buffer !== 'undefined') {
                  decoded = Buffer.from(padded, 'base64').toString('utf8');
                }
              } catch (e) {
                decoded = null;
              }
              // decoded payload logging removed to avoid leaking token details
            }
          }
        } catch (e) {
          console.error(
            'Error while attempting to decode JWT for debugging',
            e,
          );
        }
        // Trigger auto-logout if a logout handler is registered
        try {
          if (logoutHandler) {
            console.warn('Triggering auto-logout due to invalid token');
            logoutHandler();
          }
        } catch (e) {
          console.error('Error while executing logout handler', e);
        }
      }
    } catch (e) {
      console.error('Failed to log HTTP error details', e);
    }

    return Promise.reject(error);
  },
);
