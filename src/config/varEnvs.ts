import { Platform } from 'react-native';

export const ENVIRONMENT: 'development' | 'staging' | 'production' =
  process.env.EXPO_PUBLIC_ENVIRONMENT;
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';
const DOMAIN_ANDROID = process.env.EXPO_PUBLIC_DOMAIN_ANDROID;
const DOMAIN_IOS = process.env.EXPO_PUBLIC_DOMAIN_IOS;
const PORT = process.env.EXPO_PUBLIC_PORT;
const HTTP_PROTOCOL = process.env.EXPO_PUBLIC_HTTP_PROTOCOL;
const WS_PROTOCOL = process.env.EXPO_PUBLIC_WS_PROTOCOL;

const localhost = Platform.select({
  android: DOMAIN_ANDROID,
  ios: DOMAIN_IOS,
  web: DOMAIN_ANDROID,
});

const DOMAIN = PORT ? `${localhost}:${PORT}` : `${localhost}`;

export const HTTP_DOMAIN = `${HTTP_PROTOCOL}://${DOMAIN}`;

export const WS_DOMAIN = `${WS_PROTOCOL}://${DOMAIN}`;

export const UNSPLASH_API_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY || '';

export const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
