export interface CommunityLibrarySubmission {
  id: string;
  submittedBy: string;
  type: "ritual" | "prompt";
  contentId: string;
  status: "pending" | "approved" | "rejected";
  tags: string[];
  reviewedBy?: string;
  submittedAt: string;
}
