'use client';

import Link from 'next/link';
import { useAuth } from '@/entities/user/model/AuthContext';
import { DemoButton } from '@/features/auth/demo/ui/DemoButton';

export function HomePage() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow p-8 text-center">
      <h1 className="text-2xl font-bold mb-2">auth-jwt API tester</h1>
      <p className="text-gray-500 text-sm mb-6">{process.env.NEXT_PUBLIC_API_URL}</p>

      {user ? (
        <div className="space-y-3">
          <p className="text-gray-700">
            Logged in as <span className="font-semibold">{user.name}</span> ({user.email})
          </p>
          <Link
            href="/profile"
            className="inline-block bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-700"
          >
            Go to Profile
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <DemoButton />
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>
          <div className="flex gap-3 justify-center">
            <Link
              href="/login"
              className="bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-50"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
