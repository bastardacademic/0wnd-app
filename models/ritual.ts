export interface Ritual {
  id: string;
  title: string;
  description: string;
  tags: string[];
  intensity: "soft" | "medium" | "hard";
  createdBy: string;
  visibility: "private" | "shared" | "community";
  proofRequired: {
    photo?: boolean;
    audio?: boolean;
    journal?: boolean;
  };
  scheduledTime?: string;
  repeatFrequency?: "daily" | "weekly" | "custom";
  assignedTo?: string;
  isTemplate: boolean;
  source: "user" | "official" | "community";
  status: "active" | "completed" | "expired";
  createdAt: string;
}
