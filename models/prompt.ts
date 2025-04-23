export interface Prompt {
  id: string;
  text: string;
  category: "reflection" | "fantasy" | "obedience";
  tags: string[];
  intensity: "soft" | "medium" | "hard";
  tone: "strict" | "playful" | "loving";
  createdBy: string;
  visibility: "private" | "shared" | "community";
  isTemplate: boolean;
  approved: boolean;
  createdAt: string;
}
