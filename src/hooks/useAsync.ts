'use client';

import { useState, useCallback } from 'react';
import { type Status } from '@/types';

// ============================================================
// useAsync — Generic hook for async operations with status
// ============================================================

interface UseAsyncState<T> {
  data: T | null;
  status: Status;
  error: string | null;
}

interface UseAsyncReturn<T> extends UseAsyncState<T> {
  execute: (...args: unknown[]) => Promise<void>;
  reset: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export function useAsync<T>(
  asyncFn: (...args: unknown[]) => Promise<T>,
): UseAsyncReturn<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    status: 'idle',
    error: null,
  });

  const execute = useCallback(
    async (...args: unknown[]) => {
      setState({ data: null, status: 'loading', error: null });
      try {
        const data = await asyncFn(...args);
        setState({ data, status: 'success', error: null });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Ocorreu um erro inesperado';
        setState({ data: null, status: 'error', error: message });
      }
    },
    [asyncFn],
  );

  const reset = useCallback(() => {
    setState({ data: null, status: 'idle', error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  };
}
