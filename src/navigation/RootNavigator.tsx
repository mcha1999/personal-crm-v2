import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer, Theme as NavigationTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppButton } from '../components/primitives/AppButton';
import { AppText } from '../components/primitives/AppText';
import { useDatabaseSetup } from '../core/hooks/useDatabaseSetup';
import { useTheme } from '../core/theme/ThemeProvider';
import { useOnboardingStatus } from '../features/onboarding/OnboardingProvider';
import type { MainTabParamList, RootStackParamList } from './types';
import { ContactsScreen } from '../screens/ContactsScreen';
import { ContactDetailScreen } from '../screens/ContactDetailScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { RemindersScreen } from '../screens/RemindersScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.surface },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.muted,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Reminders" component={RemindersScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator: React.FC = () => {
  const { theme, resolvedScheme } = useTheme();
  const { ready, error, retry } = useDatabaseSetup();
  const { status, completed } = useOnboardingStatus();
  const navigationTheme: NavigationTheme = React.useMemo(() => {
    const base = resolvedScheme === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      dark: resolvedScheme === 'dark',
      colors: {
        ...base.colors,
        background: theme.background,
        card: theme.surface,
        border: theme.border,
        notification: theme.accent,
        primary: theme.accent,
        text: theme.text,
      },
    };
  }, [resolvedScheme, theme]);

  if (error) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: theme.background }]}>
        <AppText variant="subtitle" weight="medium" style={styles.spacing}>
          We could not prepare your private workspace.
        </AppText>
        <AppButton label="Try again" onPress={retry} />
      </View>
    );
  }

  if (!ready || status !== 'ready') {
    return (
      <View style={[styles.fullScreen, { backgroundColor: theme.background }]}>
        <ActivityIndicator color={theme.accent} size="large" />
        <AppText variant="body" color={theme.muted} style={styles.spacing}>
          Preparing your personal CRM…
        </AppText>
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        {completed ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ContactDetail" component={ContactDetailScreen} options={{ title: 'Contact details' }} />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  spacing: {
    marginTop: 16,
    textAlign: 'center',
  },
});
