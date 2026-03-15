'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormMessage } from '@/shared/ui/FormMessage';
import { userApi } from '@/entities/user/api';
import { useAuth } from '@/entities/user/model/AuthContext';

export function DeleteAccountSection() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Delete your account? This cannot be undone.')) return;
    setLoading(true);
    try {
      await userApi.deleteProfile();
      setUser(null);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-3">
      <p className="text-sm text-gray-600">
        This will permanently delete your account and all data.
      </p>
      {error && <FormMessage text={error} />}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Deleting…' : 'Delete account'}
      </button>
    </div>
  );
}
