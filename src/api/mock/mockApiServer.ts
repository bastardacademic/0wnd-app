// src/api/mock/mockApiServer.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './mockApiHandlers';

const worker = setupWorker(...handlers);

export function startMockApiServer() {
  if (typeof window !== 'undefined') {
    worker.start({
      onUnhandledRequest: 'bypass', // allow real requests if not mocked
    });
  }
}
