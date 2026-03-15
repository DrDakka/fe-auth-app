import { LoginForm } from '@/features/auth/login/ui/LoginForm';

export function LoginPage() {
  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h1 className="text-xl font-bold mb-6">Login</h1>
      <LoginForm />
    </div>
  );
}
