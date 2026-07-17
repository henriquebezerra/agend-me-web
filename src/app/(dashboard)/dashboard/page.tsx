import type { Metadata } from 'next';
import { CalendarCheck2 } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Bem-vindo ao AgendMe. Seus agendamentos aparecerão aqui.
        </p>
      </div>

      <Card>
        <CardBody className="flex flex-col items-center gap-4 py-16 text-center">
          <CalendarCheck2 className="h-12 w-12 text-[#268596]" strokeWidth={1.5} />
          <div className="flex flex-col gap-1">
            <p className="font-medium text-slate-700 dark:text-slate-200">
              Nenhum agendamento ainda
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Em breve você poderá gerenciar seus agendamentos por aqui.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
