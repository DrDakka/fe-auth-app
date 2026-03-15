'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormField } from '@/shared/ui/FormField';
import { FormMessage } from '@/shared/ui/FormMessage';
import { usePasswordResetConfirm } from '../model/usePasswordResetConfirm';

export function PasswordResetConfirmForm() {
  const params = useSearchParams();
  const token = params.get('token') || '';
  const { newPwd, setNewPwd, confirmation, setConfirmation, error, loading, handleSubmit } =
    usePasswordResetConfirm(token);

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-red-500">No reset token found in URL.</p>
        <Link href="/password-reset" className="underline text-sm mt-2 block">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="New password"
        type="password"
        value={newPwd}
        onChange={(e) => setNewPwd(e.target.value)}
        required
        minLength={6}
      />
      <FormField
        label="Confirm new password"
        type="password"
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
        required
        minLength={6}
      />
      {error && <FormMessage text={error} />}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        {loading ? 'Resetting…' : 'Reset password'}
      </button>
    </form>
  );
}
