import React from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Screen } from '../components/layout/Screen';
import { AppText } from '../components/primitives/AppText';
import { useTheme } from '../core/theme/ThemeProvider';
import { useContactSearch } from '../features/contacts/hooks';
import type { Contact } from '../features/contacts/types';
import type { RootStackParamList } from '../navigation/types';

export const ContactsScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = React.useState('');
  const { data: contacts = [] } = useContactSearch(query);

  const handlePress = React.useCallback(
    (contact: Contact) => {
      navigation.navigate('ContactDetail', { contactId: contact.id });
    },
    [navigation]
  );

  return (
    <Screen>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by name, email, or company"
          placeholderTextColor={theme.muted}
          value={query}
          onChangeText={setQuery}
          style={[styles.searchInput, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
        />
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            style={({ pressed }) => [
              styles.contactRow,
              {
                backgroundColor: pressed ? `${theme.accent}11` : theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.contactContent}>
              <AppText weight="medium">{item.fullName}</AppText>
              {item.company ? (
                <AppText variant="caption" color={theme.muted}>
                  {item.company}
                </AppText>
              ) : null}
              {item.email ? (
                <AppText variant="caption" color={theme.muted}>
                  {item.email}
                </AppText>
              ) : null}
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <AppText variant="caption" color={theme.muted} style={styles.emptyState}>
            {query.length > 0 ? 'No contacts match your search yet.' : 'Add contacts to see them listed here.'}
          </AppText>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  contactRow: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  contactContent: {
    gap: 6,
  },
  emptyState: {
    marginTop: 64,
    textAlign: 'center',
  },
});
