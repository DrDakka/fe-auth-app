'use client';

import Link from 'next/link';
import { useAuth } from '@/entities/user/model/AuthContext';
import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton';

export function Nav() {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg tracking-tight">
        auth-jwt
      </Link>
      <div className="flex gap-4 items-center text-sm">
        {user ? (
          <>
            <span className="text-gray-400">{user.email}</span>
            <Link href="/profile" className="hover:text-gray-300">
              Profile
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-gray-900 px-3 py-1 rounded hover:bg-gray-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
