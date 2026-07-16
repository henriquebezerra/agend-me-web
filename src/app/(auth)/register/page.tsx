'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import authService from '@/services/auth.service';
import { APP_NAME } from '@/constants';
import { registerSchema, type RegisterFormData } from '@/lib/validations';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      await authService.register(data);

      setSuccessMessage('Conta criada com sucesso! Redirecionando para login...');
      setTimeout(() => {
        router.push('/login');
      }, 1600);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : 'Erro ao criar conta. Tente novamente.',
      );
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
            Criar conta
          </h1>
          <p className="text-sm sm:text-base text-blue-50">
            Comece a usar o {APP_NAME}
          </p>
        </div>

        {/* Messages */}
        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50/90 p-3 text-sm text-red-700 shadow-sm dark:border-red-800/60 dark:bg-red-950/30 dark:text-red-300">
            <div className="font-medium">Não foi possível criar a conta</div>
            <div className="mt-1">{apiError}</div>
          </div>
        )}
        {successMessage && (
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4 sm:px-6">
          <div className="flex flex-col gap-4 px-2 sm:px-0">
            <Input
              label="Nome completo"
              type="text"
              placeholder="Digite seu nome"
              id="register-name"
              autoComplete="name"
              {...register('name')}
              error={errors.name?.message}
              disabled={isLoading}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              id="register-email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
              disabled={isLoading}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              id="register-password"
              autoComplete="new-password"
              {...register('password')}
              error={errors.password?.message}
              disabled={isLoading}
            />
          </div>

          <div className="sticky bottom-0 bg-transparent pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 sm:h-16 rounded-2xl bg-[#268596] hover:bg-[#1f6377] text-white border-0"
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-blue-100 dark:text-blue-200">
          Já tem conta?{' '}
          <Link
            href="/login"
            className="font-medium text-white hover:text-blue-100 hover:underline dark:text-blue-100"
          >
            Entrar aqui
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
