'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActivate } from '../model/useActivate';

export function ActivateStatus() {
  const params = useSearchParams();
  const token = params.get('token');
  const { status, message } = useActivate(token);

  if (status === 'loading') {
    return <p className="text-gray-500">Activating account…</p>;
  }

  if (status === 'success') {
    return (
      <>
        <h1 className="text-xl font-bold mb-2">Account activated!</h1>
        <p className="text-gray-500 text-sm mb-4">You can now log in.</p>
        <Link
          href="/login"
          className="bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-700"
        >
          Login
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-2 text-red-500">Activation failed</h1>
      <p className="text-gray-500 text-sm mb-4">{message}</p>
      <Link href="/register" className="underline text-sm">
        Back to register
      </Link>
    </>
  );
}
