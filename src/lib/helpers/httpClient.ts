import axios from 'axios';
import { HTTP_DOMAIN } from '@config/varEnvs';

export const backendHttpClient = axios.create({
  baseURL: `${HTTP_DOMAIN}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});
