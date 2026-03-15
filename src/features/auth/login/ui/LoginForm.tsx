'use client';

import Link from 'next/link';
import { FormField } from '@/shared/ui/FormField';
import { FormMessage } from '@/shared/ui/FormMessage';
import { useLoginForm } from '../model/useLoginForm';

export function LoginForm() {
  const { email, setEmail, password, setPassword, error, loading, handleSubmit } =
    useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <FormMessage text={error} />}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
      >
        {loading ? 'Logging in…' : 'Login'}
      </button>
      <div className="text-sm text-center space-y-1">
        <p>
          No account?{' '}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>
        <p>
          <Link href="/password-reset" className="underline text-gray-500">
            Forgot password?
          </Link>
        </p>
      </div>
    </form>
  );
}
