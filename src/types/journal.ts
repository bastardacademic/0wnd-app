export interface JournalEntry {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  reward?: string;        // Optional reward linked to Journal Entry
  punishment?: string;    // Optional punishment linked to Journal Entry
}
