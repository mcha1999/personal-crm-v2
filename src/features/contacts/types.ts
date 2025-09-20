export interface Contact {
  readonly id: string;
  readonly fullName: string;
  readonly email?: string;
  readonly company?: string;
  readonly lastInteractionAt?: string;
}
