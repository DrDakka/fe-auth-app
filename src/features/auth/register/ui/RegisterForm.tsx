'use client';

import Link from 'next/link';
import { FormField } from '@/shared/ui/FormField';
import { FormMessage } from '@/shared/ui/FormMessage';
import { useRegisterForm } from '../model/useRegisterForm';

export function RegisterForm() {
  const { name, setName, email, setEmail, password, setPassword, error, success, loading, handleSubmit } =
    useRegisterForm();

  if (success) {
    return (
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Check your email</h1>
        <p className="text-gray-500 text-sm mb-4">
          We sent an activation link to <span className="font-medium">{email}</span>.
          Click the link in the email to activate your account.
        </p>
        <Link href="/login" className="underline text-sm">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={3}
        />
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
          minLength={6}
        />
        {error && <FormMessage text={error} />}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Registering…' : 'Register'}
        </button>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
