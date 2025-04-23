export const promptService = {
  fetchAll: async () => {
    return []; // TODO: Replace with DB logic
  },

  create: async (data, userId) => {
    return { ...data, createdBy: userId, createdAt: new Date() };
  },

  update: async (id, data) => {
    return { id, ...data };
  },

  delete: async (id) => {
    return true;
  }
};
