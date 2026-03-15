import { Suspense } from 'react';
import { ActivateStatus } from '@/features/auth/activate/ui/ActivateStatus';

export function ActivatePage() {
  return (
    <div className="bg-white rounded-xl shadow p-8 text-center">
      <Suspense fallback={<p className="text-gray-500">Loading…</p>}>
        <ActivateStatus />
      </Suspense>
    </div>
  );
}
