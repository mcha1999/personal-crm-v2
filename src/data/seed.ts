import type { SQLiteDatabase } from 'expo-sqlite';

import type { Contact } from '../features/contacts/types';
import type { Reminder } from '../features/reminders/types';
import { countContacts, upsertContact } from './contacts';
import { countReminders, upsertReminder } from './reminders';

const contactSeeds: Contact[] = [
  {
    id: 'contact-alex',
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    company: 'Johnson Design Co.',
    lastInteractionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'contact-priya',
    fullName: 'Priya Patel',
    email: 'priya@example.com',
    company: 'Acme Ventures',
    lastInteractionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: 'contact-sam',
    fullName: 'Sam Chen',
    email: 'sam@example.com',
    company: 'Riverbank Labs',
    lastInteractionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
];

const reminderSeeds: Reminder[] = [
  {
    id: 'reminder-alex-checkin',
    title: 'Check in with Alex about design feedback',
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    contactId: 'contact-alex',
    status: 'pending',
  },
  {
    id: 'reminder-priya-pitch',
    title: 'Send revised pitch deck to Priya',
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    contactId: 'contact-priya',
    status: 'pending',
  },
];

export const seedDatabase = async (db: SQLiteDatabase): Promise<void> => {
  const [contactsCount, remindersCount] = await Promise.all([countContacts(db), countReminders(db)]);

  if (contactsCount === 0) {
    for (const contact of contactSeeds) {
      await upsertContact(db, contact);
    }
  }

  if (remindersCount === 0) {
    for (const reminder of reminderSeeds) {
      await upsertReminder(db, reminder);
    }
  }
};
