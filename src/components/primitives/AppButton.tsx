import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { useTheme } from '../../core/theme/ThemeProvider';
import type { ThemeValues } from '../../core/theme/themes';
import { AppText } from './AppText';

type ButtonTone = 'primary' | 'secondary' | 'ghost';

type Props = TouchableOpacityProps & {
  readonly label: string;
  readonly tone?: ButtonTone;
  readonly loading?: boolean;
};

export const AppButton: React.FC<Props> = ({ label, tone = 'primary', loading = false, disabled, style, ...touchableProps }) => {
  const { theme } = useTheme();
  const background = resolveBackground(theme, tone);
  const color = resolveTextColor(theme, tone);
  const borderColor = tone === 'ghost' ? 'transparent' : theme.border;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      disabled={disabled || loading}
      style={[styles.base, { backgroundColor: background, borderColor }, style]}
      {...touchableProps}
    >
      <View style={styles.content}>
        {loading ? <ActivityIndicator color={color} /> : <AppText weight="medium" color={color}>{label}</AppText>}
      </View>
    </TouchableOpacity>
  );
};

const resolveBackground = (theme: ThemeValues, tone: ButtonTone): string => {
  switch (tone) {
    case 'primary':
      return theme.accent;
    case 'secondary':
      return theme.surface;
    case 'ghost':
    default:
      return 'transparent';
  }
};

const resolveTextColor = (theme: ThemeValues, tone: ButtonTone): string => {
  switch (tone) {
    case 'primary':
      return theme.surface;
    case 'secondary':
      return theme.text;
    case 'ghost':
    default:
      return theme.accent;
  }
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
