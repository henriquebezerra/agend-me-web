import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import { APP_NAME, APP_DESCRIPTION, STORAGE_KEYS } from '@/constants';
import I18nProvider from '@/components/providers/I18nProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ['agendamento', 'gestão', 'clientes', 'profissionais'],
  authors: [{ name: 'AgendMe Team' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const language = cookieStore.get(STORAGE_KEYS.LANGUAGE)?.value ?? 'pt-BR';

  return (
    <html lang={language} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <I18nProvider language={language}>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
