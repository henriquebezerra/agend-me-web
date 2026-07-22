'use client';

import { CalendarCheck2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardBody } from '@/components/ui/Card';

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-token-primary">
          {t('dashboard.title')}
        </h1>
        <p className="mt-1 text-sm text-token-muted">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <Card>
        <CardBody className="flex flex-col items-center gap-4 py-16 text-center">
          <CalendarCheck2 className="h-12 w-12 text-[#268596]" strokeWidth={1.5} />
          <div className="flex flex-col gap-1">
            <p className="font-medium text-token-secondary">
              {t('dashboard.emptyTitle')}
            </p>
            <p className="text-sm text-token-subtle">
              {t('dashboard.emptySubtitle')}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
