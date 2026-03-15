'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/shared/api/authApi';

export function usePasswordResetConfirm(token: string) {
  const router = useRouter();
  const [newPwd, setNewPwd] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.resetPassword(token, newPwd, confirmation);
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return { newPwd, setNewPwd, confirmation, setConfirmation, error, loading, handleSubmit };
}
