import { Suspense } from 'react';
import { PasswordResetConfirmForm } from '@/features/password-reset/confirm/ui/PasswordResetConfirmForm';

export function PasswordResetConfirmPage() {
  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h1 className="text-xl font-bold mb-6">Set new password</h1>
      <Suspense fallback={<p className="text-gray-500">Loading…</p>}>
        <PasswordResetConfirmForm />
      </Suspense>
    </div>
  );
}
