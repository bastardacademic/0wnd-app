import { handleJournalPost } from '../handlers/journalHandler';

export const routes = [
  {
    method: 'POST',
    path: '/api/journal',
    handler: handleJournalPost
  }
];
