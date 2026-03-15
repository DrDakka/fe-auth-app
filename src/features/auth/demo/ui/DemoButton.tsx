'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/shared/api/authApi';
import { useAuth } from '@/entities/user/model/AuthContext';

export function DemoButton() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDemo = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await authApi.loginAsDemo();
      setUser(data.user);
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleDemo}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Loading…' : '▶ Try demo'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
