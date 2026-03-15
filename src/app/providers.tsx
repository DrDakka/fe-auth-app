'use client';

import { AuthProvider } from '@/entities/user/model/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
