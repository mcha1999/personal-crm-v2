import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Screen } from '../components/layout/Screen';
import { AppText } from '../components/primitives/AppText';
import { useTheme } from '../core/theme/ThemeProvider';
import { useAllReminders } from '../features/reminders/hooks';
import { formatDate, formatRelativeToNow } from '../utils/date';

export const RemindersScreen: React.FC = () => {
  const { theme } = useTheme();
  const { data: reminders = [] } = useAllReminders();

  return (
    <Screen>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}> 
            <AppText weight="medium">{item.title}</AppText>
            <AppText variant="caption" color={theme.muted}>
              Due {formatRelativeToNow(item.dueAt)} ({formatDate(item.dueAt)})
            </AppText>
            <AppText variant="caption" color={theme.muted}>
              Status: {item.status}
            </AppText>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() => (
          <AppText variant="caption" color={theme.muted} style={styles.empty}>
            Create reminders to follow through on important promises.
          </AppText>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  empty: {
    marginTop: 64,
    textAlign: 'center',
  },
});
