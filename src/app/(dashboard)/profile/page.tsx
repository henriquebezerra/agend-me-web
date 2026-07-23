'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Pencil, Plus, UserCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { EstablishmentCard } from '@/components/ui/EstablishmentCard';
import establishmentService from '@/services/establishment.service';
import type { Establishment } from '@/types/establishment';

export default function ProfilePage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    establishmentService.getMyEstablishments()
      .then(setEstablishments)
      .catch((err: Error) => setError(err.message ?? t('profile.errorLoading')))
      .finally(() => setIsLoading(false));
  }, [t]);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <Card className="relative">
        <div className="absolute bottom-0 left-0">
          <IconButton
            icon={<Pencil className="h-4 w-4" />}
            tooltip={t('profile.editProfile')}
            tooltipSide="right"
            className="h-12 w-12 rounded-none rounded-bl-2xl"
          />
        </div>
        <CardBody className="flex flex-col items-center gap-4 py-8 text-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.nome}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-[#268596]/20"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#268596]/10 ring-4 ring-[#268596]/20">
              <UserCircle2 className="h-14 w-14 text-[#268596]" strokeWidth={1.5} />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-token-primary">
              {user?.nome ?? '—'}
            </h1>
            <p className="text-sm text-token-muted">
              {user?.email ?? '—'}
            </p>
          </div>
        </CardBody>
      </Card>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-token-primary">
            {t('profile.myEstablishments')}
          </h2>
          <div className="group/add relative">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              className="cursor-pointer bg-[#268596] hover:bg-[#1f6377]"
            >
              {t('profile.addEstablishment')}
            </Button>
            <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/add:opacity-100">
              {t('profile.addEstablishmentTooltip')}
            </span>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center py-16">
            <Calendar className="h-8 w-8 text-token-brand animate-spin" strokeWidth={1.5} />
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50/90 p-3 text-sm text-red-700 dark:border-red-800/60 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {!isLoading && !error && establishments.length === 0 && (
          <Card>
            <CardBody className="flex flex-col items-center gap-4 py-16 text-center">
              <Calendar className="h-12 w-12 text-token-brand" strokeWidth={1.5} />
              <div className="flex flex-col gap-1">
                <p className="font-medium text-token-secondary">
                  {t('profile.emptyEstablishmentsTitle')}
                </p>
                <p className="text-sm text-token-subtle">
                  {t('profile.emptyEstablishmentsSubtitle')}
                </p>
              </div>
            </CardBody>
          </Card>
        )}

        {!isLoading && !error && establishments.map((establishment) => (
          <EstablishmentCard key={establishment.id} establishment={establishment} />
        ))}
      </div>
    </div>
  );
}
