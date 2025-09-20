import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/Screen';
import { AppText } from '../components/primitives/AppText';
import { useTheme } from '../core/theme/ThemeProvider';
import { useContact } from '../features/contacts/hooks';
import type { RootStackParamList } from '../navigation/types';
import { formatDate } from '../utils/date';

export const ContactDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ContactDetail'>>();
  const { theme } = useTheme();
  const { data: contact } = useContact(route.params?.contactId);

  if (!contact) {
    return (
      <Screen>
        <AppText variant="subtitle" color={theme.muted}>
          We could not find this contact.
        </AppText>
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">
          {contact.fullName}
        </AppText>
        {contact.company ? (
          <AppText variant="body" color={theme.muted}>
            {contact.company}
          </AppText>
        ) : null}
      </View>

      <View style={[styles.section, { borderColor: theme.border, backgroundColor: theme.surface }]}> 
        {contact.email ? (
          <View style={styles.sectionRow}>
            <AppText weight="medium">Email</AppText>
            <AppText color={theme.muted}>{contact.email}</AppText>
          </View>
        ) : null}
        {contact.lastInteractionAt ? (
          <View style={styles.sectionRow}>
            <AppText weight="medium">Last interaction</AppText>
            <AppText color={theme.muted}>{formatDate(contact.lastInteractionAt)}</AppText>
          </View>
        ) : null}
      </View>

      <AppText variant="caption" color={theme.muted}>
        Detailed notes and interaction history will live here as you expand the app.
      </AppText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 24,
  },
  section: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  sectionRow: {
    gap: 4,
  },
});
