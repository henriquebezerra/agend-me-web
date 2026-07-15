'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import authService from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { APP_NAME } from '@/constants';
import { loginSchema, type LoginFormData } from '@/lib/validations';

type LoginFormValues = LoginFormData;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await authService.login(data);

      if (!response.success) {
        throw new Error(response.message || 'Falha na autenticação.');
      }

      const { user, tokens } = response.data;
      useAuthStore.getState().login(user, tokens.accessToken);
      router.push('/dashboard');
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Erro ao entrar. Verifique suas credenciais e tente novamente.';

      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardBody className="flex flex-col gap-6 p-6 sm:p-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 text-center px-2 sm:px-0">
          <Calendar className="h-12 w-12 text-[#268596]" strokeWidth={1.5} />
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Bem-vindo!
          </h1>
          <p className="text-sm sm:text-base text-blue-50">
            Entre na sua conta {APP_NAME}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-2 sm:px-0">
          {apiError && (
            <div className="rounded-xl border border-red-200 bg-red-50/90 p-3 text-sm text-red-700 shadow-sm dark:border-red-800/60 dark:bg-red-950/30 dark:text-red-300">
              <div className="mt-1">{apiError}</div>
            </div>
          )}

          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            id="login-email"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
            disabled={isLoading}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            id="login-password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isLoading}
          />

          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-blue-100 hover:text-white hover:underline dark:text-blue-200"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full mt-2 bg-[#268596] hover:bg-[#1f6377] text-white border-0"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
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
