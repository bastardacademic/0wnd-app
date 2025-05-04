import { http, HttpResponse } from 'msw'

let journalEntries = []
let prompts = [{ id: '1', text: 'What are you grateful for today?' }]
let rituals = []

export const handlers = [
  http.get('/api/prompts', () => {
    return HttpResponse.json(prompts)
  }),

  http.post('/api/journal', async (ctx) => {
    const entry = await ctx.request.json()
    journalEntries.push(entry)
    return HttpResponse.json({ success: true, entry })
  }),

  http.get('/api/scheduled-rituals', () => {
    return HttpResponse.json(rituals)
  }),

  http.post('/api/xp', async (ctx) => {
    const data = await ctx.request.json()
    return HttpResponse.json({ success: true, awarded: data.amount })
  })
]
