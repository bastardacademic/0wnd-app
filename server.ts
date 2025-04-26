import express from "express";
import cors from "cors";
import { mockDb } from "./src/api/mock/mockDb";
import { setupMockApiHandlers } from "./src/api/mock/mockApiHandlers";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mount all /api handlers
setupMockApiHandlers(app, mockDb);

app.get("/", (req, res) => {
  res.send("0wnd Mock API Server Running ✅");
});

app.listen(port, () => {
  console.log(`🚀 Mock API server running at http://localhost:${port}`);
});
