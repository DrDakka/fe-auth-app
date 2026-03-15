'use client';

import { useState } from 'react';
import { UserInfo } from '@/entities/user/ui/UserInfo';
import { UpdateInfoForm } from '@/features/profile/update-info/ui/UpdateInfoForm';
import { ChangePasswordForm } from '@/features/profile/change-password/ui/ChangePasswordForm';
import { DeleteAccountSection } from '@/features/profile/delete-account/ui/DeleteAccountSection';
import type { User } from '@/entities/user/model/types';

type Tab = 'info' | 'update' | 'password' | 'delete';

const tabs: { key: Tab; label: string }[] = [
  { key: 'info', label: 'Info' },
  { key: 'update', label: 'Update' },
  { key: 'password', label: 'Password' },
  { key: 'delete', label: 'Delete' },
];

type Props = {
  profile: User;
  onProfileUpdate: (updated: User) => void;
};

export function ProfileTabs({ profile, onProfileUpdate }: Props) {
  const [tab, setTab] = useState<Tab>('info');

  return (
    <>
      <div className="flex gap-2 mb-6 border-b pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`text-sm px-3 py-1 rounded ${
              tab === t.key ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'info' && <UserInfo user={profile} />}
      {tab === 'update' && <UpdateInfoForm onSuccess={onProfileUpdate} />}
      {tab === 'password' && <ChangePasswordForm />}
      {tab === 'delete' && <DeleteAccountSection />}
    </>
  );
}
