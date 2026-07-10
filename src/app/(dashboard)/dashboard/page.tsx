import type { Metadata } from 'next';
import { CalendarCheck2, Users, TrendingUp, Clock } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Dashboard',
};

// ============================================================
// Stats Card
// ============================================================

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function StatCard({ label, value, change, positive, icon: Icon, color }: StatCardProps) {
  return (
    <Card>
      <CardBody className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
          <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</span>
          <span
            className={`text-xs font-medium ${
              positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
            }`}
          >
            {change}
          </span>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </CardBody>
    </Card>
  );
}

// ============================================================
// Dashboard Page
// ============================================================

const stats: StatCardProps[] = [
  {
    label: 'Agendamentos Hoje',
    value: '12',
    change: '+3 em relação a ontem',
    positive: true,
    icon: CalendarCheck2,
    color: 'bg-violet-500',
  },
  {
    label: 'Total de Clientes',
    value: '248',
    change: '+12 este mês',
    positive: true,
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    label: 'Receita do Mês',
    value: 'R$ 8.450',
    change: '+18% vs mês anterior',
    positive: true,
    icon: TrendingUp,
    color: 'bg-emerald-500',
  },
  {
    label: 'Tempo Médio',
    value: '45min',
    change: '-5min vs mês anterior',
    positive: true,
    icon: Clock,
    color: 'bg-amber-500',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Bom dia! 👋
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Aqui está um resumo do seu negócio hoje.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Content Placeholder */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Próximos Agendamentos
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Nenhum agendamento para as próximas horas.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Clientes Recentes
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Nenhum cliente cadastrado recentemente.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
