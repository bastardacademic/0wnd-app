import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { searchUsers, sendLinkRequest, getPartnerships, updatePartnershipStatus, UserSearchResult, Partnership, PartnerRole } from "@/api/services/partnerService";

export const PartnerLinking = () => {
  const { id } = useUser();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [selectedRole, setSelectedRole] = useState<PartnerRole>("dom");
  const [msg, setMsg] = useState("");
  const [searching, setSearching] = useState(false);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 4000); };

  const loadPartnerships = async () => {
    try { setPartnerships(await getPartnerships(id)); } catch { setPartnerships([]); }
  };

  useEffect(() => { loadPartnerships(); }, [id]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try { setResults(await searchUsers(query)); }
    catch { flash("Search failed - is the backend running?"); }
    finally { setSearching(false); }
  };

  const handleRequest = async (recipientId: string, username: string) => {
    try {
      await sendLinkRequest(id, recipientId, selectedRole);
      flash("Link request sent to " + username + ".");
      setResults([]); setQuery(""); loadPartnerships();
    } catch (err: any) {
      flash(err?.response?.status === 409 ? "Request already sent." : "Failed to send request.");
    }
  };

  const handleStatusUpdate = async (partnershipId: string, status: "accepted" | "rejected" | "dissolved") => {
    try { await updatePartnershipStatus(partnershipId, status); loadPartnerships(); }
    catch { flash("Failed to update partnership."); }
  };

  const incoming = partnerships.filter(p => p.status === "pending" && p.recipient._id === id);
  const outgoing = partnerships.filter(p => p.status === "pending" && p.initiator._id === id);
  const active = partnerships.filter(p => p.status === "accepted");

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold">Partner Linking</h2>

      {incoming.length > 0 && (
        <section>
          <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3">Incoming Requests</h3>
          <div className="space-y-3">
            {incoming.map(p => (
              <div key={p._id} className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <span className="font-semibold">{p.initiator.username}</span>
                  <span className="ml-2 text-xs text-neutral-400">wants to link — role: <span className="capitalize text-purple-400">{p.initiatorRole}</span></span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleStatusUpdate(p._id, "accepted")} className="px-3 py-1 bg-green-800 hover:bg-green-700 text-white text-xs rounded">Accept</button>
                  <button onClick={() => handleStatusUpdate(p._id, "rejected")} className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 text-white text-xs rounded">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {outgoing.length > 0 && (
        <section>
          <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3">Sent Requests</h3>
          <div className="space-y-3">
            {outgoing.map(p => (
              <div key={p._id} className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <span className="font-semibold">{p.recipient.username}</span>
                  <span className="ml-2 text-xs text-neutral-400">awaiting response</span>
                </div>
                <button onClick={() => handleStatusUpdate(p._id, "dissolved")} className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 text-white text-xs rounded">Cancel</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3">Active Partnerships</h3>
        {active.length === 0 ? <p className="text-sm text-neutral-500">No active partnerships yet.</p> : (
          <div className="space-y-3">
            {active.map(p => {
              const isInitiator = p.initiator._id === id;
              const partner = isInitiator ? p.recipient : p.initiator;
              const myRole = isInitiator ? p.initiatorRole : (p.initiatorRole === "dom" ? "sub" : "dom");
              return (
                <div key={p._id} className="bg-neutral-800 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{partner.username}</span>
                    <span className={"ml-2 text-xs px-2 py-0.5 rounded-full capitalize " + (myRole === "dom" ? "bg-purple-900 text-purple-300" : "bg-pink-900 text-pink-300")}>You: {myRole}</span>
                  </div>
                  <button onClick={() => handleStatusUpdate(p._id, "dissolved")} className="px-3 py-1 bg-red-900 hover:bg-red-800 text-white text-xs rounded">Dissolve</button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3">Link a Partner</h3>
        <div className="flex gap-2 mb-3">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} placeholder="Search by username..." className="flex-1 p-3 rounded bg-neutral-800 text-white placeholder-neutral-500 text-sm" />
          <button onClick={handleSearch} disabled={searching} className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded text-sm disabled:opacity-50">{searching ? "..." : "Search"}</button>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="text-xs text-neutral-400 self-center">Your role:</span>
          {(["dom", "sub"] as PartnerRole[]).map(r => (
            <button key={r} onClick={() => setSelectedRole(r)} className={"px-3 py-1 rounded text-xs capitalize " + (selectedRole === r ? "bg-purple-700 text-white" : "bg-neutral-800 text-neutral-400")}>{r}</button>
          ))}
        </div>
       {results.length > 0 && (
          <div className="space-y-2">
            {results.map(u => (
              <div key={u._id} className="bg-neutral-800 rounded-lg p-3 flex items-center justify-between">
                <span className="text-sm">{u.username} <span className="text-neutral-500 text-xs">({u.role})</span></span>
                <button onClick={() => handleRequest(u._id, u.username)} className="px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white text-xs rounded">Send Request</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {msg && <p className="text-sm text-neutral-400">{msg}</p>}
    </div>
  );
};