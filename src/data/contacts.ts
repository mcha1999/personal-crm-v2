import type { SQLiteDatabase } from 'expo-sqlite';

import type { Contact } from '../features/contacts/types';

interface ContactRow {
  readonly id: string;
  readonly full_name: string;
  readonly email: string | null;
  readonly company: string | null;
  readonly last_interaction_at: string | null;
}

export const ensureContactSchema = async (db: SQLiteDatabase): Promise<void> => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT,
      company TEXT,
      last_interaction_at TEXT
    )
  `);
};

const mapRow = (row: ContactRow): Contact => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email ?? undefined,
  company: row.company ?? undefined,
  lastInteractionAt: row.last_interaction_at ?? undefined,
});

export const fetchContacts = async (db: SQLiteDatabase): Promise<Contact[]> => {
  const rows = await db.getAllAsync<ContactRow>('SELECT * FROM contacts ORDER BY full_name COLLATE NOCASE');
  return rows.map(mapRow);
};

export const fetchContact = async (db: SQLiteDatabase, id: string): Promise<Contact | null> => {
  const row = await db.getFirstAsync<ContactRow>('SELECT * FROM contacts WHERE id = ? LIMIT 1', [id]);
  return row ? mapRow(row) : null;
};

export const searchContacts = async (db: SQLiteDatabase, query: string): Promise<Contact[]> => {
  const like = `%${query}%`;
  const rows = await db.getAllAsync<ContactRow>(
    `SELECT * FROM contacts WHERE full_name LIKE ? OR email LIKE ? OR company LIKE ? ORDER BY full_name COLLATE NOCASE`,
    [like, like, like]
  );
  return rows.map(mapRow);
};

export const countContacts = async (db: SQLiteDatabase): Promise<number> => {
  const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM contacts');
  return result?.count ?? 0;
};

export const upsertContact = async (db: SQLiteDatabase, contact: Contact): Promise<void> => {
  await db.runAsync(
    `INSERT OR REPLACE INTO contacts (id, full_name, email, company, last_interaction_at) VALUES (?, ?, ?, ?, ?)`,
    [contact.id, contact.fullName, contact.email ?? null, contact.company ?? null, contact.lastInteractionAt ?? null]
  );
};
