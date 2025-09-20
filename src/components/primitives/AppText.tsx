import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

import { useTheme } from '../../core/theme/ThemeProvider';

export type TextVariant = 'title' | 'subtitle' | 'body' | 'caption';
export type TextWeight = 'regular' | 'medium' | 'bold';

interface Props extends TextProps {
  readonly variant?: TextVariant;
  readonly weight?: TextWeight;
  readonly color?: string;
}

const variantStyles: Record<TextVariant, { fontSize: number; lineHeight: number }> = {
  title: { fontSize: 24, lineHeight: 32 },
  subtitle: { fontSize: 18, lineHeight: 26 },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 12, lineHeight: 16 },
};

const weightMap: Record<TextWeight, '400' | '500' | '700'> = {
  regular: '400',
  medium: '500',
  bold: '700',
};

export const AppText: React.FC<Props> = ({
  variant = 'body',
  weight = 'regular',
  color,
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        {
          color: color ?? theme.text,
          fontSize: variantStyles[variant].fontSize,
          lineHeight: variantStyles[variant].lineHeight,
          fontWeight: weightMap[weight],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0.25,
  },
});
