import { rest } from "msw";
import { mockDb } from "./mockDb";

export const handlers = [
  rest.get("/api/rewards", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: "reward1", description: "Extra Praise" },
        { id: "reward2", description: "Small Treat" },
        { id: "punishment1", description: "5 Pushups" },
        { id: "punishment2", description: "Cold Shower" },
      ])
    );
  }),
  
  // (other handlers already defined will remain)
];
