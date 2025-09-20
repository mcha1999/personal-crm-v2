import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View, ViewProps } from 'react-native';

import { useTheme } from '../../core/theme/ThemeProvider';

interface ScreenProps extends ViewProps {
  readonly scrollable?: boolean;
  readonly children: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({ scrollable = false, children, style, ...rest }) => {
  const { theme } = useTheme();

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.base, { backgroundColor: theme.background }, style] as ScrollViewProps['style']}
        contentContainerStyle={styles.contentContainer}
        {...rest}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.base, { backgroundColor: theme.background }, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  contentContainer: {
    paddingBottom: 48,
  },
});
