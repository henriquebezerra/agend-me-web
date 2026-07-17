'use client';

import { CalendarCheck2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardBody } from '@/components/ui/Card';

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {t('dashboard.title')}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <Card>
        <CardBody className="flex flex-col items-center gap-4 py-16 text-center">
          <CalendarCheck2 className="h-12 w-12 text-[#268596]" strokeWidth={1.5} />
          <div className="flex flex-col gap-1">
            <p className="font-medium text-slate-700 dark:text-slate-200">
              {t('dashboard.emptyTitle')}
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {t('dashboard.emptySubtitle')}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
