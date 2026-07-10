import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
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
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardBody className="flex flex-col gap-6 p-6 sm:p-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 text-center px-2 sm:px-0">
          <Calendar className="h-12 w-12 text-[#268596]" strokeWidth={1.5} />
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Bem-vindo de volta!
          </h1>
          <p className="text-sm sm:text-base text-blue-50">
            Entre na sua conta {APP_NAME}
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4 px-2 sm:px-0">
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
              className="text-xs text-blue-100 hover:text-white hover:underline dark:text-blue-200"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button type="submit" size="lg" className="w-full mt-2 bg-[#268596] hover:bg-[#1f6377] text-white border-0">
            Entrar
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-blue-100 dark:text-blue-200">
          Ainda não tem conta?{' '}
          <Link
            href="/register"
            className="font-medium text-white hover:text-blue-100 hover:underline dark:text-blue-100"
          >
            Criar conta grátis
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
