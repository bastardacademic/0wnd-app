import { rest } from "msw/browser";
import { mockDb } from "./mockDb";

export const handlers = [
  rest.post("/api/journal", async (req, res, ctx) => {
    const data = await req.json();
    const id = Date.now();
    mockDb.journalEntries.push({ id, ...data });
    return res(ctx.status(201), ctx.json({ id, ...data }));
  }),

  rest.post("/api/rituals", async (req, res, ctx) => {
    const data = await req.json();
    const id = Date.now();
    mockDb.rituals.push({ id, ...data });
    return res(ctx.status(201), ctx.json({ id, ...data }));
  }),

  rest.get("/api/prompts", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockDb.prompts));
  }),

  rest.post("/api/prompts/:promptId/responses", async (req, res, ctx) => {
    const { promptId } = req.params;
    const data = await req.json();
    mockDb.promptResponses.push({ id: Date.now(), promptId, ...data });
    return res(ctx.status(201), ctx.json({ id: Date.now(), promptId, ...data }));
  }),

  rest.post("/api/xp", async (req, res, ctx) => {
    const data = await req.json();
    mockDb.xpAwards.push({ id: Date.now(), ...data });
    return res(ctx.status(201), ctx.json({ id: Date.now(), ...data }));
  })
];
