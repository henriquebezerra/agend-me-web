import Link from 'next/link';
import {
  LayoutDashboard,
  CalendarCheck2,
  Users,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================
// Sidebar Component — left navigation panel
// ============================================================

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Agendamentos', href: '/dashboard/appointments', icon: CalendarCheck2 },
  { label: 'Clientes', href: '/dashboard/clients', icon: Users },
  { label: 'Configurações', href: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full w-64 flex-col border-r border-slate-200 bg-white',
        'dark:border-slate-700 dark:bg-slate-900',
        className,
      )}
    >
      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5',
                    'text-sm font-medium text-slate-600',
                    'transition-all duration-150',
                    'hover:bg-violet-50 hover:text-violet-700',
                    'dark:text-slate-300 dark:hover:bg-violet-900/20 dark:hover:text-violet-400',
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
