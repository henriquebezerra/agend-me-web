import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tooltip?: string;
  tooltipSide?: 'left' | 'right';
  className?: string;
  containerClassName?: string;
}

export function IconButton({ icon, tooltip, tooltipSide = 'left', className, containerClassName, onClick, ...props }: IconButtonProps) {
  const tooltipPosition =
    tooltipSide === 'right'
      ? 'left-full ml-2 top-1/2 -translate-y-1/2'
      : 'right-full mr-2 top-1/2 -translate-y-1/2';

  return (
    <div className={cn('group/iconbtn relative cursor-pointer', containerClassName)}>
      <button
        className={cn(
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg',
          'bg-[#268596] text-white hover:bg-[#1f6377] transition-colors',
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {icon}
      </button>
      {tooltip && (
        <span className={cn('pointer-events-none absolute whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/iconbtn:opacity-100', tooltipPosition)}>
          {tooltip}
        </span>
      )}
    </div>
  );
}
