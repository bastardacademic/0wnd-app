export interface Ritual {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  reward?: string;        // Optional reward linked to Ritual
  punishment?: string;    // Optional punishment linked to Ritual
}
