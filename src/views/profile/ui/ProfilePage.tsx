'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userApi } from '@/entities/user/api';
import { useAuth } from '@/entities/user/model/AuthContext';
import { ProfileTabs } from '@/widgets/profile-tabs/ui/ProfileTabs';
import type { User } from '@/entities/user/model/types';

export function ProfilePage() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    userApi
      .getProfile()
      .then(setProfile)
      .catch(() => { setUser(null); router.push('/login'); });
  }, [user, router, setUser]);

  if (!profile) return <p className="text-center text-gray-500">Loading…</p>;

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      <ProfileTabs profile={profile} onProfileUpdate={setProfile} />
    </div>
  );
}
