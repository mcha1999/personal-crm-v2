import type { SQLiteDatabase } from 'expo-sqlite';

import type { Reminder } from '../features/reminders/types';

interface ReminderRow {
  readonly id: string;
  readonly title: string;
  readonly due_at: string;
  readonly contact_id: string | null;
  readonly status: string;
}

export const ensureReminderSchema = async (db: SQLiteDatabase): Promise<void> => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS reminders (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      due_at TEXT NOT NULL,
      contact_id TEXT,
      status TEXT NOT NULL
    )
  `);
};

const mapRow = (row: ReminderRow): Reminder => ({
  id: row.id,
  title: row.title,
  dueAt: row.due_at,
  contactId: row.contact_id ?? undefined,
  status: (row.status as Reminder['status']) ?? 'pending',
});

export const fetchPendingReminders = async (db: SQLiteDatabase): Promise<Reminder[]> => {
  const rows = await db.getAllAsync<ReminderRow>(
    `SELECT * FROM reminders WHERE status = 'pending' ORDER BY due_at ASC`
  );
  return rows.map(mapRow);
};

export const fetchAllReminders = async (db: SQLiteDatabase): Promise<Reminder[]> => {
  const rows = await db.getAllAsync<ReminderRow>('SELECT * FROM reminders ORDER BY due_at ASC');
  return rows.map(mapRow);
};

export const countReminders = async (db: SQLiteDatabase): Promise<number> => {
  const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM reminders');
  return result?.count ?? 0;
};

export const upsertReminder = async (db: SQLiteDatabase, reminder: Reminder): Promise<void> => {
  await db.runAsync(
    `INSERT OR REPLACE INTO reminders (id, title, due_at, contact_id, status) VALUES (?, ?, ?, ?, ?)`,
    [reminder.id, reminder.title, reminder.dueAt, reminder.contactId ?? null, reminder.status]
  );
};
