type Table = Record<string, any>[];

const db = {
  rituals: [] as Table,
  prompts: [] as Table,
  journal: [] as Table,
  devotion: [] as Table,
  consent: [] as Table,
  community: [] as Table
};

const generateId = () => crypto.randomUUID?.() || Date.now().toString();

export const mockDb = {
  get: (table: keyof typeof db) => db[table],

  find: (table: keyof typeof db, filter: (row: any) => boolean) =>
    db[table].filter(filter),

  insert: (table: keyof typeof db, data: any) => {
    const entry = { id: generateId(), ...data };
    db[table].push(entry);
    return entry;
  },

  update: (table: keyof typeof db, id: string, updates: any) => {
    const index = db[table].findIndex(row => row.id === id);
    if (index !== -1) {
      db[table][index] = { ...db[table][index], ...updates };
      return db[table][index];
    }
    return null;
  },

  delete: (table: keyof typeof db, id: string) => {
    const index = db[table].findIndex(row => row.id === id);
    if (index !== -1) {
      db[table].splice(index, 1);
      return true;
    }
    return false;
  }
};
