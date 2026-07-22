'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, CheckCircle } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import usuarioService from '@/services/usuario.service';
import { APP_NAME } from '@/constants';
import { createRegisterSchema, type RegisterFormData } from '@/lib/validations';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const registerSchema = useMemo(() => createRegisterSchema(t), [t]);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await usuarioService.create(data);
      setIsSuccess(true);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : t('register.errorDefault'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardBody className="flex flex-col items-center gap-6 p-6 sm:p-8 text-center">
          <CheckCircle className="h-16 w-16 text-[#268596]" strokeWidth={1.5} />
          <div className="flex flex-col gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {t('register.successTitle')}
            </h1>
            <p className="text-sm sm:text-base text-blue-50">
              {t('register.successSubtitle', { APP_NAME })}
            </p>
          </div>
          <Button
            size="lg"
            className="w-full h-14 sm:h-16 rounded-2xl bg-[#268596] hover:bg-[#1f6377] text-white border-0"
            onClick={() => router.push('/login')}
          >
            {t('register.goToLogin')}
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardBody className="flex flex-col gap-6 p-6 sm:p-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 text-center px-2 sm:px-0">
          <Calendar className="h-12 w-12 text-[#268596]" strokeWidth={1.5} />
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {t('register.title')}
          </h1>
          <p className="text-sm sm:text-base text-blue-50">
            {t('register.subtitle')} {APP_NAME}
          </p>
        </div>

        {/* Error */}
        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50/90 p-3 text-sm text-red-700 shadow-sm dark:border-red-800/60 dark:bg-red-950/30 dark:text-red-300">
            <div className="font-medium">{t('register.errorHeader')}</div>
            <div className="mt-1">{apiError}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4 sm:px-6">
          <div className="flex flex-col gap-4 px-2 sm:px-0">
            <Input
              label={t('register.nameLabel')}
              type="text"
              placeholder={t('register.namePlaceholder')}
              id="register-name"
              autoComplete="name"
              {...register('nome')}
              error={errors.nome?.message}
              disabled={isLoading}
            />

            <Input
              label={t('register.emailLabel')}
              type="email"
              placeholder={t('register.emailPlaceholder')}
              id="register-email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
              disabled={isLoading}
            />

            <Input
              label={t('register.passwordLabel')}
              type="password"
              placeholder={t('register.passwordPlaceholder')}
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
              {isLoading ? t('register.loading') : t('register.submitButton')}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-blue-100 dark:text-blue-200">
          {t('register.haveAccount')}{' '}
          <Link
            href="/login"
            className="font-medium text-white hover:text-blue-100 hover:underline dark:text-blue-100"
          >
            {t('register.loginHere')}
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
