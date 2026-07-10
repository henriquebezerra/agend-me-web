import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}
