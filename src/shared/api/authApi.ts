import { request } from './request';
import type { User } from '@/entities/user/model/types';

export const authApi = {
  loginAsDemo: () =>
    request<{ user: User }>('/demo', { method: 'POST' }),

  login: (email: string, password: string) =>
    request<{ user: User }>('/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () => request('/auth/logout', { method: 'PATCH' }),

  refresh: () => request<{ user: User }>('/auth/refresh', { method: 'POST' }),

  register: (name: string, email: string, password: string) =>
    request('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  activate: (token: string) =>
    request(`/register/activate?token=${encodeURIComponent(token)}`),

  requestPasswordReset: (email: string) =>
    request('/password/reset-request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, newPwd: string, confirmation: string) =>
    request('/password/reset', {
      method: 'POST',
      body: JSON.stringify({ token, newPwd, confirmation }),
    }),
};
