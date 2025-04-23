import { mockDb } from "../utils/mockDb";

export const ritualService = {
  fetchAssigned: async (userId: string) => {
    return mockDb.find("rituals", r => r.assignedTo === userId);
  },

  fetchTemplates: async () => {
    return mockDb.find("rituals", r => r.isTemplate && r.visibility === "community");
  },

  create: async (data, creatorId: string) => {
    return mockDb.insert("rituals", {
      ...data,
      createdBy: creatorId,
      createdAt: new Date().toISOString()
    });
  },

  complete: async (ritualId: string, userId: string) => {
    return mockDb.update("rituals", ritualId, {
      status: "completed",
      completedBy: userId
    });
  },

  uploadProof: async (ritualId: string, files: any, userId: string) => {
    const fakeUrl = "https://example.com/proof-" + Date.now();
    return fakeUrl;
  }
};
