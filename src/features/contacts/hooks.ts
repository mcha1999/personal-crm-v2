import { useQuery } from '@tanstack/react-query';

import { fetchContact, fetchContacts, searchContacts } from '../../data/contacts';
import { getDatabase } from '../../data/database';
import type { Contact } from './types';

export const useContacts = () => {
  return useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const db = await getDatabase();
      return fetchContacts(db);
    },
  });
};

export const useContact = (contactId: string | undefined) => {
  return useQuery<Contact | null>({
    queryKey: ['contact', contactId],
    enabled: Boolean(contactId),
    queryFn: async () => {
      if (!contactId) {
        return null;
      }

      const db = await getDatabase();
      return fetchContact(db, contactId);
    },
  });
};

export const useContactSearch = (query: string) => {
  return useQuery<Contact[]>({
    queryKey: ['contacts', 'search', query],
    queryFn: async () => {
      const db = await getDatabase();
      const trimmed = query.trim();
      if (trimmed.length === 0) {
        return fetchContacts(db);
      }

      return searchContacts(db, trimmed);
    },
  });
};
