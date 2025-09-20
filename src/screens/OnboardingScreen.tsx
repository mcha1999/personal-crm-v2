import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/Screen';
import { AppButton } from '../components/primitives/AppButton';
import { AppText } from '../components/primitives/AppText';
import { useTheme } from '../core/theme/ThemeProvider';
import { useOnboardingStatus } from '../features/onboarding/OnboardingProvider';

const benefits = [
  'Keep every relationship note on your device only.',
  'Log interactions and set gentle follow-up nudges.',
  'Search by name, company, or topic instantly.',
];

export const OnboardingScreen: React.FC = () => {
  const { theme } = useTheme();
  const { completeOnboarding } = useOnboardingStatus();

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">
          Welcome to Persona
        </AppText>
        <AppText variant="body" color={theme.muted} style={styles.bodyCopy}>
          Your private relationship workspace lives entirely on your device. No servers. No tracking. Just context when you need it.
        </AppText>
      </View>

      <View style={styles.card}>
        {benefits.map((benefit) => (
          <View key={benefit} style={styles.benefitRow}>
            <View style={[styles.bullet, { backgroundColor: theme.accent }]} />
            <AppText style={styles.benefitText}>{benefit}</AppText>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <AppButton label="Get started" onPress={completeOnboarding} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
    gap: 12,
  },
  bodyCopy: {
    marginTop: 8,
  },
  card: {
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  benefitText: {
    flex: 1,
  },
  footer: {
    marginTop: 48,
  },
});
