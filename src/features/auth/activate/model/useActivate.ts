'use client';

import { useEffect, useState } from 'react';
import { authApi } from '@/shared/api/authApi';

export function useActivate(token: string | null) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No activation token found in URL.');
      return;
    }
    authApi
      .activate(token)
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Activation failed');
      });
  }, [token]);

  return { status, message };
}
