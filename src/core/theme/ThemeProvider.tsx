import React from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ColorScheme, ThemePreference, ThemeValues, themesByScheme } from './themes';

const STORAGE_KEY = 'personal-crm.theme-preference';

export interface ThemeContextValue {
  readonly theme: ThemeValues;
  readonly resolvedScheme: ColorScheme;
  readonly preference: ThemePreference;
  readonly setPreference: (preference: ThemePreference) => Promise<void>;
}

const defaultScheme: ColorScheme = 'light';

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

interface Props {
  readonly children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const systemScheme = (useColorScheme() ?? defaultScheme) as ColorScheme;
  const [preference, setPreferenceState] = React.useState<ThemePreference>('system');
  const resolvedScheme: ColorScheme = preference === 'system' ? systemScheme : preference;

  React.useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!isMounted || !stored) {
          return;
        }

        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setPreferenceState(stored);
        }
      } catch (error) {
        console.warn('Failed to load theme preference', error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const theme = React.useMemo(() => themesByScheme[resolvedScheme], [resolvedScheme]);

  const setPreference = React.useCallback(async (next: ThemePreference) => {
    setPreferenceState(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      console.warn('Failed to persist theme preference', error);
    }
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedScheme,
      preference,
      setPreference,
    }),
    [theme, resolvedScheme, preference, setPreference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
