export interface JournalEntry {
  id: string;
  authorId: string;
  title?: string;
  content: string;
  embeddedMedia: {
    imageUrls: string[];
    audioUrls: string[];
  };
  tags: string[];
  linkedPromptId?: string;
  visibility: "private" | "shared" | "public";
  devotionPointsEarned: number;
  createdAt: string;
}
