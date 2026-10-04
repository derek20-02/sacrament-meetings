// app/login/page.tsx
import { LoginForm } from '@/components/LoginForms';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}