import express from "express";
import { mockApiHandlers } from "./mockApiHandlers";

export function startMockServer() {
  const app = express();
  app.use(express.json());

  mockApiHandlers(app);

  app.listen(5174, () => {
    console.log("? Mock API Server running on http://localhost:5174");
  });
}

