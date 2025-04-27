import { setupWorker } from "msw/browser";
import { handlers } from "./mockApiHandlers";

export function startMockApiServer() {
  if (typeof window !== "undefined") {
    const worker = setupWorker(...handlers);
    worker.start();
  }
}
