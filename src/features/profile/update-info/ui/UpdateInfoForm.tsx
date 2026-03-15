'use client';

import { useState } from 'react';
import { FormField } from '@/shared/ui/FormField';
import { FormMessage } from '@/shared/ui/FormMessage';
import { userApi } from '@/entities/user/api';
import { useAuth } from '@/entities/user/model/AuthContext';
import type { User } from '@/entities/user/model/types';

type Props = {
  onSuccess: (updated: User) => void;
};

export function UpdateInfoForm({ onSuccess }: Props) {
  const { user, setUser } = useAuth();
  const [upd, setUpd] = useState({ password: '', name: '', email: '', confirmEmail: '' });
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const flash = (text: string, ok: boolean) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: Parameters<typeof userApi.updateProfile>[0] = { password: upd.password };
      if (upd.name) payload.name = upd.name;
      if (upd.email) { payload.email = upd.email; payload.confirmEmail = upd.confirmEmail; }
      const updated = await userApi.updateProfile(payload);
      setUser({ ...user!, ...updated });
      setUpd({ password: '', name: '', email: '', confirmEmail: '' });
      onSuccess(updated);
      flash('Profile updated', true);
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Update failed', false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-xs text-gray-400">
        Fill only the fields you want to change. Current password is required.
      </p>
      {msg && <FormMessage text={msg.text} ok={msg.ok} />}
      <div>
        <label className="block text-sm font-medium mb-1">
          Current password <span className="text-red-400">*</span>
        </label>
        <input
          type="password"
          value={upd.password}
          onChange={(e) => setUpd({ ...upd, password: e.target.value })}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        />
      </div>
      <FormField
        label="New name"
        type="text"
        value={upd.name}
        onChange={(e) => setUpd({ ...upd, name: e.target.value })}
        minLength={3}
      />
      <FormField
        label="New email"
        type="email"
        value={upd.email}
        onChange={(e) => setUpd({ ...upd, email: e.target.value })}
      />
      {upd.email && (
        <FormField
          label="Confirm new email"
          type="email"
          value={upd.confirmEmail}
          onChange={(e) => setUpd({ ...upd, confirmEmail: e.target.value })}
        />
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        {loading ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  );
}
