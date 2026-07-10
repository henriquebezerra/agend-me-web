import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// Input Component — design system primitive
// ============================================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftAddon, rightAddon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftAddon && (
            <span className="absolute left-3 flex items-center text-slate-400">{leftAddon}</span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm',
              'text-slate-900 placeholder-slate-400',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
              'dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500',
              error
                ? 'border-red-400 focus:ring-red-400 dark:border-red-500'
                : 'border-slate-300 dark:border-slate-600',
              leftAddon && 'pl-10',
              rightAddon && 'pr-10',
              className,
            )}
            {...props}
          />

          {rightAddon && (
            <span className="absolute right-3 flex items-center text-slate-400">{rightAddon}</span>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
