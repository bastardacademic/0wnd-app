import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { RitualCard } from "../rituals/RitualCard";
import { ProtocolBuilder } from "../rituals/ProtocolBuilder";
import { DevotionMeter } from "../devotion/DevotionMeter";

type Sub = { id: string; displayName: string; xp?: number };
type Ritual = { id: string; name?: string; title?: string; description?: string; status?: string };
type KPIs = { pendingApprovals: number; activeRituals: number; complianceRate: number };

const StatCard = ({ label, value, sub }: { label: string; value: string | number; sub?: string }) => (
  <div className="bg-neutral-800 rounded-lg p-4 flex flex-col gap-1">
    <span className="text-xs text-neutral-400 uppercase tracking-wide">{label}</span>
    <span className="text-2xl font-bold text-white">{value}</span>
    {sub && <span className="text-xs text-neutral-500">{sub}</span>}
  </div>
);

export const DomDashboard = () => {
  const { id } = useUser();
  const [myRituals, setMyRituals] = useState<Ritual[]>([]);
  const [subs, setSubs] = useState<Sub[]>([]);
  const [kpis, setKpis] = useState<KPIs>({ pendingApprovals: 0, activeRituals: 0, complianceRate: 0 });
  const [showBuilder, setShowBuilder] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  const flash = (msg: string) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(""), 3000);
  };

  const refreshRituals = async () => {
    try {
      const res = await axios.get("/api/rituals/created", { headers: { "x-user-id": id } });
      const data: Ritual[] = Array.isArray(res.data) ? res.data : [];
      setMyRituals(data);
      setKpis(prev => ({
        ...prev,
        activeRituals: data.length,
        pendingApprovals: data.filter(r => r.status === "proof_submitted").length,
        complianceRate: data.length
          ? Math.round((data.filter(r => r.status === "completed").length / data.length) * 100)
          : 0,
      }));
    } catch {
      setMyRituals([]);
    }
  };

  useEffect(() => {
    refreshRituals();
    axios.get("/api/users/subs", { headers: { "x-user-id": id } })
      .then(res => setSubs(Array.isArray(res.data) ? res.data : []))
      .catch(() => setSubs([]));
  }, [id]);

  return (
    <div className="space-y-8 p-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Control Panel</h2>
        <button
          onClick={() => { setShowBuilder(v => !v); }}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm transition"
        >
          {showBuilder ? "Close Builder" : "+ New Ritual"}
        </button>
      </div>

      {/* KPIs */}
      <section>
        <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3">Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Pending Approvals" value={kpis.pendingApprovals} sub="awaiting your review" />
          <StatCard label="Active Rituals" value={kpis.activeRituals} sub="assigned across all subs" />
          <StatCard label="Compliance Rate" value={`${kpis.complianceRate}%`} sub="rituals completed on time" />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => flash("Approve proof: open the relevant ritual to review submission.")}
            className="px-4 py-2 bg-green-800 hover:bg-green-700 text-white rounded-lg text-sm transition"
          >
            Approve Proof
          </button>
          <button
            onClick={() => flash("Apply consequence: select a ritual to trigger its consequence.")}
            className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-lg text-sm transition"
          >
            Apply Consequence
          </button>
          <button
            onClick={() => setShowBuilder(true)}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm transition"
          >
            Assign Ritual
          </button>
        </div>
        {actionMsg && <p className="mt-2 text-sm text-neutral-400">{actionMsg}</p>}
      </section>

      {/* Protocol Builder */}
      {showBuilder && (
        <section className="bg-neutral-800 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4">Protocol Builder</h3>
          <ProtocolBuilder />
        </section>
      )}

      {/* Subs + Devotion */}
      <section>
        <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3">Your Submissives</h3>
        {subs.length === 0 ? (
          <p className="text-sm text-neutral-500">No linked submissives yet.</p>
        ) : (
          <div className="space-y-4">
            {subs.map(sub => (
              <div key={sub.id} className="bg-neutral-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{sub.displayName}</span>
                  <span className="text-xs text-neutral-400">{sub.id}</span>
                </div>
                <DevotionMeter userId={sub.id} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Rituals List */}
      <section>
        <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3">Rituals You Created</h3>
        {myRituals.length === 0 ? (
          <p className="text-sm text-neutral-500">No rituals created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myRituals.map(ritual => (
              <RitualCard key={ritual.id} ritual={ritual} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
