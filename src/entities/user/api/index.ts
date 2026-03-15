import { request } from '@/shared/api/request';
import type { User } from '../model/types';

export type UpdateProfilePayload = {
  password: string;
  name?: string;
  email?: string;
  confirmEmail?: string;
};

export const userApi = {
  getProfile: () => request<User>('/profile'),

  updateProfile: (data: UpdateProfilePayload) =>
    request<User>('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteProfile: () => request('/profile', { method: 'DELETE' }),

  changePassword: (oldPwd: string, newPwd: string, confirmation: string) =>
    request('/profile/password', {
      method: 'PATCH',
      body: JSON.stringify({ oldPwd, newPwd, confirmation }),
    }),
};
