'use client';

import { useRouter } from 'next/navigation';
import { authApi } from '@/shared/api/authApi';
import { useAuth } from '@/entities/user/model/AuthContext';

export function LogoutButton() {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {}
    setUser(null);
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="hover:text-gray-300">
      Logout
    </button>
  );
}
