import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/Screen';
import { AppText } from '../components/primitives/AppText';
import { useTheme } from '../core/theme/ThemeProvider';
import { useContacts } from '../features/contacts/hooks';
import { usePendingReminders } from '../features/reminders/hooks';
import { formatDate, formatRelativeToNow } from '../utils/date';

export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { data: contacts = [] } = useContacts();
  const { data: reminders = [] } = usePendingReminders();
  const nextReminder = reminders[0];

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="title" weight="bold">
          Today
        </AppText>
        <AppText variant="body" color={theme.muted}>
          Stay in touch with the relationships that matter most.
        </AppText>
      </View>

      <View style={styles.cardRow}>
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <AppText variant="subtitle" weight="medium">
            Active relationships
          </AppText>
          <AppText variant="title" weight="bold">
            {contacts.length}
          </AppText>
          <AppText variant="caption" color={theme.muted}>
            Contacts stored locally on this device.
          </AppText>
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <AppText variant="subtitle" weight="medium">
            Upcoming reminder
          </AppText>
          {nextReminder ? (
            <>
              <AppText variant="title" weight="bold">
                {formatRelativeToNow(nextReminder.dueAt)}
              </AppText>
              <AppText variant="caption" color={theme.muted}>
                {nextReminder.title}
              </AppText>
            </>
          ) : (
            <AppText variant="caption" color={theme.muted}>
              You are all caught up!
            </AppText>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="subtitle" weight="medium" style={styles.sectionTitle}>
          Recently contacted
        </AppText>
        {contacts.slice(0, 3).map((contact) => (
          <View key={contact.id} style={[styles.listItem, { borderColor: theme.border }]}> 
            <AppText weight="medium">{contact.fullName}</AppText>
            <AppText variant="caption" color={theme.muted}>
              {formatDate(contact.lastInteractionAt)}
            </AppText>
          </View>
        ))}
        {contacts.length === 0 && (
          <AppText variant="caption" color={theme.muted}>
            Add contacts to start building momentum.
          </AppText>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 12,
    marginBottom: 32,
  },
  cardRow: {
    flexDirection: 'column',
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  section: {
    marginTop: 32,
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
