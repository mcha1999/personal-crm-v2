import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

import { ensureContactSchema } from './contacts';
import { ensureReminderSchema } from './reminders';
import { seedDatabase } from './seed';

const DATABASE_NAME = 'personal-crm-v2.db';

let databasePromise: Promise<SQLiteDatabase> | null = null;

export const getDatabase = async (): Promise<SQLiteDatabase> => {
  if (!databasePromise) {
    databasePromise = openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
};

export const setupDatabase = async (): Promise<void> => {
  const db = await getDatabase();
  await db.execAsync('PRAGMA foreign_keys = ON');
  await ensureContactSchema(db);
  await ensureReminderSchema(db);
  await seedDatabase(db);
};
