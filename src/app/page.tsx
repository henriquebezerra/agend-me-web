import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: 'Início',
};

// Root page redirects to dashboard (or login if not authenticated)
export default function HomePage() {
  redirect(ROUTES.DASHBOARD);
}
