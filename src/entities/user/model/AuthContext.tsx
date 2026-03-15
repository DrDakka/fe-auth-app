'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from './types';

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) localStorage.setItem('auth_user', JSON.stringify(u));
    else localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
