import { Platform } from 'react-native';

export const ENVIRONMENT: 'development' | 'staging' | 'production' =
  (process.env.EXPO_PUBLIC_ENVIRONMENT as any) || 'development';
const DOMAIN_ANDROID = process.env.EXPO_PUBLIC_DOMAIN_ANDROID || '10.0.2.2';
const DOMAIN_IOS = process.env.EXPO_PUBLIC_DOMAIN_IOS || 'localhost';
const PORT = process.env.EXPO_PUBLIC_PORT || '';
const HTTP_PROTOCOL = process.env.EXPO_PUBLIC_HTTP_PROTOCOL || 'http';
const WS_PROTOCOL = process.env.EXPO_PUBLIC_WS_PROTOCOL || 'ws';

const localhost = Platform.select({
  android: DOMAIN_ANDROID,
  ios: DOMAIN_IOS,
  web: DOMAIN_IOS,
});

// Avoid adding the port twice when the domain already contains one (e.g. "10.0.2.2:3000")
const DOMAIN = (() => {
  if (!PORT) return `${localhost}`;
  // if localhost already looks like host:port, don't append PORT again
  if (String(localhost).includes(':')) return `${localhost}`;
  return `${localhost}:${PORT}`;
})();

export const HTTP_DOMAIN = `${HTTP_PROTOCOL}://${DOMAIN}`;

export const WS_DOMAIN = `${WS_PROTOCOL}://${DOMAIN}`;

export const UNSPLASH_API_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY || '';

export const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

export const GOOGLE_ANALYTICS_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const CLARITY_ID = process.env.EXPO_PUBLIC_CLARITY_ID || '';
