import type { User } from '../model/types';

export function UserInfo({ user }: { user: User }) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex gap-2">
        <dt className="font-medium w-16">ID</dt>
        <dd className="text-gray-600">{user.id}</dd>
      </div>
      <div className="flex gap-2">
        <dt className="font-medium w-16">Name</dt>
        <dd className="text-gray-600">{user.name}</dd>
      </div>
      <div className="flex gap-2">
        <dt className="font-medium w-16">Email</dt>
        <dd className="text-gray-600">{user.email}</dd>
      </div>
    </dl>
  );
}
