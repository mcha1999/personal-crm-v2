export type ColorScheme = 'light' | 'dark';
export type ThemePreference = ColorScheme | 'system';

export interface ThemeValues {
  readonly background: string;
  readonly surface: string;
  readonly border: string;
  readonly text: string;
  readonly muted: string;
  readonly accent: string;
  readonly success: string;
  readonly warning: string;
  readonly danger: string;
}

export const lightTheme: ThemeValues = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  accent: '#6366F1',
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
};

export const darkTheme: ThemeValues = {
  background: '#0F172A',
  surface: '#1E293B',
  border: '#334155',
  text: '#E2E8F0',
  muted: '#94A3B8',
  accent: '#A855F7',
  success: '#22C55E',
  warning: '#FBBF24',
  danger: '#F87171',
};

export const themesByScheme: Record<ColorScheme, ThemeValues> = {
  light: lightTheme,
  dark: darkTheme,
};
