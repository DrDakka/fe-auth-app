'use client';

import Link from 'next/link';
import { FormField } from '@/shared/ui/FormField';
import { FormMessage } from '@/shared/ui/FormMessage';
import { usePasswordResetRequest } from '../model/usePasswordResetRequest';

export function PasswordResetRequestForm() {
  const { email, setEmail, error, success, loading, handleSubmit } =
    usePasswordResetRequest();

  if (success) {
    return (
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Check your email</h1>
        <p className="text-gray-500 text-sm mb-4">
          We sent a password reset link to <span className="font-medium">{email}</span>.
        </p>
        <Link href="/login" className="underline text-sm">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-6">Reset password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <FormMessage text={error} />}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Sending…' : 'Send reset link'}
        </button>
        <p className="text-sm text-center">
          <Link href="/login" className="underline">
            Back to login
          </Link>
        </p>
      </form>
    </>
  );
}
