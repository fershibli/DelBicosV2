import { backendHttpClient } from '@lib/helpers/httpClient';

export const AuthService = {
  async me() {
    const response = await backendHttpClient.get('/api/user/me');
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await backendHttpClient.post('/api/user/login', {
      email,
      password,
    });
    return response;
  },

  async loginAdmin(email: string, password: string) {
    const response = await backendHttpClient.post('/api/admin/login', {
      email,
      password,
    });
    return response.data;
  },

  async register(formData: any) {
    const response = await backendHttpClient.post('/auth/register', formData);
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const response = await backendHttpClient.post('/api/user/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response;
  },

  async uploadAvatar(base64Image: string) {
    const response = await backendHttpClient.post(`/api/user/imgbb/avatar`, {
      base64Image: base64Image,
    });
    return response.data;
  },

  async removeAvatar() {
    const response = await backendHttpClient.delete(`/api/user/avatar`);
    return response.data;
  },

  async resendCode(email: string) {
    const response = await backendHttpClient.post('/auth/resend', { email });
    return response;
  },
};
