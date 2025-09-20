import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/Screen';
import { AppButton } from '../components/primitives/AppButton';
import { AppText } from '../components/primitives/AppText';
import { useColorSchemePreference } from '../core/hooks/useColorSchemePreference';
import { useTheme } from '../core/theme/ThemeProvider';
import { useOnboardingStatus } from '../features/onboarding/OnboardingProvider';

const themeOptions = [
  { label: 'Match system', value: 'system' as const },
  { label: 'Light', value: 'light' as const },
  { label: 'Dark', value: 'dark' as const },
];

export const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { preference, setPreference } = useColorSchemePreference();
  const { resetOnboarding, completed } = useOnboardingStatus();

  return (
    <Screen scrollable>
      <View style={styles.section}>
        <AppText variant="subtitle" weight="medium">
          Theme
        </AppText>
        <AppText variant="caption" color={theme.muted}>
          Choose how Persona should look on this device.
        </AppText>

        <View style={styles.optionList}>
          {themeOptions.map((option) => {
            const isActive = preference === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => {
                  void setPreference(option.value);
                }}
                style={[
                  styles.option,
                  {
                    backgroundColor: isActive ? `${theme.accent}22` : theme.surface,
                    borderColor: isActive ? theme.accent : theme.border,
                  },
                ]}
              >
                <AppText weight={isActive ? 'bold' : 'regular'}>{option.label}</AppText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="subtitle" weight="medium">
          Onboarding
        </AppText>
        <AppText variant="caption" color={theme.muted}>
          Revisit the welcome tour and privacy overview.
        </AppText>
        <AppButton
          label="Reset onboarding"
          tone="secondary"
          onPress={() => {
            void resetOnboarding();
          }}
          disabled={!completed}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
    gap: 12,
  },
  optionList: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 8,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
});
