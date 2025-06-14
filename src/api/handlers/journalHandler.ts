export async function handleJournalPost(req: Request): Promise<Response> {
  const body = await req.json();
  console.log("Received journal:", body);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });
}
