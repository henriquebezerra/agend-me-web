import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#268596] via-[#3a9bae] to-[#63C2D1] dark:from-[#1a5a68] dark:via-[#2a7a88] to-[#4a9ba8]">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}
