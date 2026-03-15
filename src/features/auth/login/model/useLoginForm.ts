'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/shared/api/authApi';
import { useAuth } from '@/entities/user/model/AuthContext';

export function useLoginForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      setUser(data.user);
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, error, loading, handleSubmit };
}
