'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import authService from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { APP_NAME } from '@/constants';
import { createLoginSchema, type LoginFormData } from '@/lib/validations';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const loginSchema = useMemo(() => createLoginSchema(t), [t]);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const user = await authService.login(data);
      useAuthStore.getState().login(user);
      router.push('/dashboard');
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : t('login.errorDefault');

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
          <h1 className="text-xl sm:text-2xl font-bold color-primary-login">
            {t('login.title')}
          </h1>
          <p className="text-sm sm:text-base color-primary-login">
            {t('login.subtitle')} {APP_NAME}
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
            label={t('login.emailLabel')}
            type="email"
            placeholder={t('login.emailPlaceholder')}
            id="login-email"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
            disabled={isLoading}
          />
          <Input
            label={t('login.passwordLabel')}
            type="password"
            placeholder={t('login.passwordPlaceholder')}
            id="login-password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isLoading}
          />

          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-blue-100 color-primary-login hover:underline dark:text-blue-200"
            >
              {t('login.forgotPassword')}
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full mt-2 bg-[#268596] hover:bg-[#1f6377] text-white border-0"
            disabled={isLoading}
          >
            {isLoading ? t('login.loading') : t('login.submitButton')}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm color-primary-login dark:text-blue-200">
          {t('login.noAccount')}{' '}
          <Link
            href="/register"
            className="font-medium color-primary-login hover:text-blue-100 hover:underline dark:text-blue-100"
          >
            {t('login.createAccount')}
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
