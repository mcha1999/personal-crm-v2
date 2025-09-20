import { ThemePreference, ColorScheme } from '../theme/themes';
import { useTheme } from '../theme/ThemeProvider';

interface UseColorSchemePreferenceResult {
  readonly preference: ThemePreference;
  readonly resolvedScheme: ColorScheme;
  readonly setPreference: (value: ThemePreference) => Promise<void>;
}

export const useColorSchemePreference = (): UseColorSchemePreferenceResult => {
  const { preference, resolvedScheme, setPreference } = useTheme();
  return { preference, resolvedScheme, setPreference };
};
