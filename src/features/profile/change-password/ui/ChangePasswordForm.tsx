'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormMessage } from '@/shared/ui/FormMessage';
import { userApi } from '@/entities/user/api';
import { useAuth } from '@/entities/user/model/AuthContext';

export function ChangePasswordForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [pwd, setPwd] = useState({ oldPwd: '', newPwd: '', confirmation: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userApi.changePassword(pwd.oldPwd, pwd.newPwd, pwd.confirmation);
      setUser(null);
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-xs text-gray-400">After changing password you will be logged out.</p>
      {(['oldPwd', 'newPwd', 'confirmation'] as const).map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1">
            {field === 'oldPwd'
              ? 'Current password'
              : field === 'newPwd'
                ? 'New password'
                : 'Confirm new password'}
          </label>
          <input
            type="password"
            value={pwd[field]}
            onChange={(e) => setPwd({ ...pwd, [field]: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
            minLength={field !== 'oldPwd' ? 6 : undefined}
          />
        </div>
      ))}
      {error && <FormMessage text={error} />}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        {loading ? 'Changing…' : 'Change password'}
      </button>
    </form>
  );
}
