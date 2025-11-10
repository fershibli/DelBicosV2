import { Platform } from 'react-native';

// Prefer a single convenient env var for full API URL if provided.
// Developers can set EXPO_PUBLIC_API_URL=http://localhost:3000 for local testing.
export const ENVIRONMENT: 'development' | 'staging' | 'production' =
  process.env.EXPO_PUBLIC_ENVIRONMENT as any;

const FULL_API_URL = process.env.EXPO_PUBLIC_API_URL; // e.g. http://localhost:3000
const DOMAIN_ANDROID = process.env.EXPO_PUBLIC_DOMAIN_ANDROID;
const DOMAIN_IOS = process.env.EXPO_PUBLIC_DOMAIN_IOS;
const PORT = process.env.EXPO_PUBLIC_PORT;
const HTTP_PROTOCOL = process.env.EXPO_PUBLIC_HTTP_PROTOCOL;
const WS_PROTOCOL = process.env.EXPO_PUBLIC_WS_PROTOCOL;

// If a full API URL is provided, use it directly (preferred).
let _httpDomain = '';
let _wsDomain = '';

if (FULL_API_URL) {
  // remove trailing slash if present
  _httpDomain = FULL_API_URL.replace(/\/+$/, '');

  // derive a WS domain from the HTTP url (http -> ws, https -> wss)
  _wsDomain = _httpDomain.replace(/^https:/, 'wss:').replace(/^http:/, 'ws:');
} else {
  const localhost = Platform.select({
    android: DOMAIN_ANDROID,
    ios: DOMAIN_IOS,
    web: DOMAIN_ANDROID,
  });

  const DOMAIN = PORT ? `${localhost}:${PORT}` : `${localhost}`;

  _httpDomain = `${HTTP_PROTOCOL}://${DOMAIN}`;
  _wsDomain = `${WS_PROTOCOL}://${DOMAIN}`;
}

export const HTTP_DOMAIN = _httpDomain;
export const WS_DOMAIN = _wsDomain;

export const UNSPLASH_API_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY || '';

export const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
