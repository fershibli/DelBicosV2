import axios from 'axios';
import { useUserStore } from '@stores/User';

const chatHttpClient = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_CHAT_SERVICE_URL || 'http://localhost:3001',
});

chatHttpClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default chatHttpClient;