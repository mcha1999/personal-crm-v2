export interface Reminder {
  readonly id: string;
  readonly title: string;
  readonly dueAt: string;
  readonly contactId?: string;
  readonly status: 'pending' | 'completed' | 'snoozed';
}
