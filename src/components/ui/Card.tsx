import { cn } from '@/lib/utils';

// ============================================================
// Card Component — flexible container primitive
// ============================================================

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white shadow-sm',
        'dark:border-slate-700 dark:bg-slate-800/50',
        'transition-shadow duration-200 hover:shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 py-4',
        'border-b border-slate-100 dark:border-slate-700',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children }: CardBodyProps) {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 px-6 py-4',
        'border-t border-slate-100 dark:border-slate-700',
        className,
      )}
    >
      {children}
    </div>
  );
}
