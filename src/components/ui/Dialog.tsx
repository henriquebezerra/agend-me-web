'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  confirmVariant?: 'primary' | 'danger';
  isLoading?: boolean;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  confirmVariant = 'primary',
  isLoading = false,
}: DialogProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      />

      {/* Dialog — bottom sheet no mobile, centered no desktop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={cn(
          'fixed z-50 bg-white dark:bg-slate-800',
          'shadow-xl',
          // Mobile: bottom sheet
          'bottom-0 left-0 right-0 rounded-t-2xl p-6',
          // Desktop: centered modal
          'sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:right-auto',
          'sm:-translate-x-1/2 sm:-translate-y-1/2',
          'sm:w-full sm:max-w-sm sm:rounded-2xl',
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5 pr-6">
            <h2
              id="dialog-title"
              className="text-base font-semibold text-slate-900 dark:text-slate-100"
            >
              {title}
            </h2>
            {description && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {cancelLabel}
            </Button>
            <Button
              variant={confirmVariant}
              size="lg"
              onClick={onConfirm}
              isLoading={isLoading}
              className={cn(
                'w-full sm:w-auto',
                confirmVariant === 'primary' && 'bg-[#268596] hover:bg-[#1f6377] border-0',
              )}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
