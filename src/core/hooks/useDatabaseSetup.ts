import React from 'react';

import { setupDatabase } from '../../data/database';

interface DatabaseSetupState {
  readonly ready: boolean;
  readonly error: Error | null;
  readonly retry: () => void;
}

export const useDatabaseSetup = (): DatabaseSetupState => {
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [attempt, setAttempt] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        await setupDatabase();
        if (!cancelled) {
          setReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = React.useCallback(() => {
    setReady(false);
    setAttempt((value) => value + 1);
  }, []);

  return { ready, error, retry };
};
