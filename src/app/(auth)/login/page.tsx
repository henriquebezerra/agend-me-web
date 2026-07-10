import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { APP_NAME } from '@/constants';

export const metadata: Metadata = {
  title: 'Entrar',
  description: `Acesse sua conta ${APP_NAME}`,
};

export default function LoginPage() {
  return (
    <Card className="w-full shadow-xl">
      <CardBody className="flex flex-col gap-6 p-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white text-xl font-bold shadow-lg shadow-violet-200 dark:shadow-violet-900/40">
            A
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Bem-vindo de volta!
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Entre na sua conta {APP_NAME}
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            id="login-email"
            autoComplete="email"
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            id="login-password"
            autoComplete="current-password"
          />

          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-violet-600 hover:underline dark:text-violet-400"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button type="submit" size="lg" className="w-full mt-2">
            Entrar
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Ainda não tem conta?{' '}
          <Link
            href="/register"
            className="font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            Criar conta grátis
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
