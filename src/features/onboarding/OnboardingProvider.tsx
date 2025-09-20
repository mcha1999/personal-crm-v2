import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'personal-crm.onboarding-completed';

type Status = 'loading' | 'ready';

interface OnboardingContextValue {
  readonly status: Status;
  readonly completed: boolean;
  readonly completeOnboarding: () => Promise<void>;
  readonly resetOnboarding: () => Promise<void>;
}

const OnboardingContext = React.createContext<OnboardingContextValue | undefined>(undefined);

interface Props {
  readonly children: React.ReactNode;
}

export const OnboardingProvider: React.FC<Props> = ({ children }) => {
  const [status, setStatus] = React.useState<Status>('loading');
  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled) {
          setCompleted(stored === 'true');
        }
      } catch (error) {
        console.warn('Failed to load onboarding flag', error);
      } finally {
        if (!cancelled) {
          setStatus('ready');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const completeOnboarding = React.useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
    setCompleted(true);
  }, []);

  const resetOnboarding = React.useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setCompleted(false);
  }, []);

  const value = React.useMemo<OnboardingContextValue>(
    () => ({ status, completed, completeOnboarding, resetOnboarding }),
    [status, completed, completeOnboarding, resetOnboarding]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboardingStatus = (): OnboardingContextValue => {
  const context = React.useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingStatus must be used within an OnboardingProvider');
  }

  return context;
};
