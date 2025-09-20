import { useQuery } from '@tanstack/react-query';

import { fetchAllReminders, fetchPendingReminders } from '../../data/reminders';
import { getDatabase } from '../../data/database';
import type { Reminder } from './types';

export const usePendingReminders = () => {
  return useQuery<Reminder[]>({
    queryKey: ['reminders', 'pending'],
    queryFn: async () => {
      const db = await getDatabase();
      return fetchPendingReminders(db);
    },
  });
};

export const useAllReminders = () => {
  return useQuery<Reminder[]>({
    queryKey: ['reminders', 'all'],
    queryFn: async () => {
      const db = await getDatabase();
      return fetchAllReminders(db);
    },
  });
};
