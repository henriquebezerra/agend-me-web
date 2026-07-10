'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { APP_NAME } from '@/constants';
import type { EstablishmentForm } from '@/types/establishment';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<EstablishmentForm>();

  const onSubmit = async (data: EstablishmentForm) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      // TODO: enviar os dados do estabelecimento para a API
      // Por enquanto apenas simula sucesso localmente
      console.log('Establishment data submitted:', data);
      setSuccessMessage('Estabelecimento salvo com sucesso!');
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : 'Erro ao criar conta. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardBody className="flex flex-col gap-6 p-6 sm:p-8">
        {/* Brand */}
        <div className="hidden sm:flex flex-col items-center gap-2 text-center px-2 sm:px-0">
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
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {apiError}
          </div>
        )}
        {successMessage && (
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4 sm:px-6">
          {/* Fields scrollable area for small screens */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] sm:max-h-none pb-4 sm:pb-0 px-2 sm:px-0">
            <Input
              label="Nome do estabelecimento"
              type="text"
              placeholder="Salão de Beleza XYZ"
              id="register-establishment-name"
              {...register('establishmentName')}
              error={errors.establishmentName?.message}
              disabled={isLoading}
            />

            <Input
              label="Rua"
              type="text"
              placeholder="Avenida Principal"
              id="register-street"
              {...register('street')}
              error={errors.street?.message}
              disabled={isLoading}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Número"
                type="text"
                placeholder="123"
                id="register-number"
                {...register('number')}
                error={errors.number?.message}
                disabled={isLoading}
              />

              <Input
                label="Bairro"
                type="text"
                placeholder="Centro"
                id="register-neighborhood"
                {...register('neighborhood')}
                error={errors.neighborhood?.message}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Cidade"
                type="text"
                placeholder="São Paulo"
                id="register-city"
                {...register('city')}
                error={errors.city?.message}
                disabled={isLoading}
              />

              <Input
                label="Estado"
                type="text"
                placeholder="SP"
                id="register-state"
                maxLength={2}
                {...register('state')}
                error={errors.state?.message}
                disabled={isLoading}
              />
            </div>

            <Input
              label="Complemento (opcional)"
              type="text"
              placeholder="Apto 101, Bloco A"
              id="register-complement"
              {...register('complement')}
              error={errors.complement?.message}
              disabled={isLoading}
            />
          </div>

          {/* Actions — keep visible */}
          <div className="sticky bottom-0 bg-transparent pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 sm:h-16 rounded-2xl bg-[#268596] hover:bg-[#1f6377] text-white border-0"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar estabelecimento'}
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
