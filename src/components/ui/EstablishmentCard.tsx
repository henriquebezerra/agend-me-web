'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Pencil, Star, Trash2 } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { IconButton } from '@/components/ui/IconButton';
import { getEstablishmentAvatarUrl } from '@/lib/utils';
import type { Establishment } from '@/types/establishment';

interface EstablishmentCardProps {
  establishment: Establishment;
}

export function EstablishmentCard({ establishment }: EstablishmentCardProps) {
  const { t } = useTranslation();
  const { nome, star, avatar, uuidStorage, endereco } = establishment;
  const [deleteOpen, setDeleteOpen] = useState(false);

  const address = [
    `${endereco.rua}, ${endereco.numero}`,
    endereco.complemento,
    `${endereco.bairro}, ${endereco.cidade}/${endereco.estado}`,
  ]
    .filter(Boolean)
    .join(' — ');

  return (
    <>
      <Card className="relative cursor-pointer">
        <CardBody className="flex items-center gap-4 pr-10">
          {avatar && uuidStorage ? (
            <img
              src={getEstablishmentAvatarUrl(uuidStorage, avatar)}
              alt={nome}
              className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-token-surface-raised">
              <Building2 className="h-7 w-7 text-token-muted" />
            </div>
          )}

          <div className="flex flex-1 flex-col gap-0.5 min-w-0">
            <span className="font-semibold text-token-primary truncate">
              {nome}
            </span>
            <span className="text-sm text-token-muted truncate">
              {address}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs text-token-muted">
                {star.toFixed(1)}
              </span>
            </div>
          </div>
        </CardBody>

        <div className="absolute top-0 right-0 bottom-0 flex flex-col">
          <IconButton
            icon={<Trash2 className="h-4 w-4" />}
            tooltip={t('profile.deleteEstablishment')}
            className="h-full w-12 rounded-none rounded-tr-2xl"
            containerClassName="flex-1"
            onClick={(e) => { e.stopPropagation(); setDeleteOpen(true); }}
          />

          <div className="h-px bg-[#1f6377]" />

          <IconButton
            icon={<Pencil className="h-4 w-4" />}
            tooltip={t('profile.editEstablishment')}
            className="h-full w-12 rounded-none"
            containerClassName="flex-1"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </Card>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => setDeleteOpen(false)}
        title={t('profile.deleteDialogTitle')}
        description={t('profile.deleteDialogDesc', { nome })}
        confirmLabel={t('profile.deleteDialogConfirm')}
        cancelLabel={t('profile.deleteDialogCancel')}
        confirmVariant="danger"
      />
    </>
  );
}
