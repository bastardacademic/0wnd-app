import React, { useState } from "react";
import { DomDashboard } from "./DomDashboard";
import { SubDashboard } from "./SubDashboard";

type SwitchRole = "dom" | "sub";

type Relationship = {
  id: string;
  partnerName: string;
  partnerId: string;
  roleInRelationship: SwitchRole;
};

const EmptyState = ({ onLink }: { onLink: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
    <div className="text-4xl">🔗</div>
    <h3 className="text-xl font-semibold text-white">No relationships linked yet</h3>
    <p className="text-sm text-neutral-400 max-w-xs">
      Link a partner to begin. Each relationship can have its own dynamic — you can be Dom in one and Sub in another.
    </p>
    <button
      onClick={onLink}
      className="px-6 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm transition"
    >
      Link a Partner
    </button>
  </div>
);

const RelationshipCard = ({
  rel,
  isActive,
  onSelect,
  onToggleRole,
}: {
  rel: Relationship;
  isActive: boolean;
  onSelect: () => void;
  onToggleRole: (id: string) => void;
}) => (
  <div className={`rounded-lg border transition ${isActive ? "border-purple-600 bg-neutral-800" : "border-neutral-700 bg-neutral-850 hover:border-neutral-500"}`}>
    <button
      onClick={onSelect}
      className="w-full flex items-center justify-between p-4 text-left"
    >
      <div>
        <span className="font-semibold text-white">{rel.partnerName}</span>
        <span className={`ml-3 text-xs px-2 py-0.5 rounded-full capitalize font-medium ${rel.roleInRelationship === "dom" ? "bg-purple-900 text-purple-300" : "bg-pink-900 text-pink-300"}`}>
          {rel.roleInRelationship === "dom" ? "You: Dom" : "You: Sub"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={e => { e.stopPropagation(); onToggleRole(rel.id); }}
          className="text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-700 hover:bg-neutral-600 transition"
        >
          Switch role
        </button>
        <span className="text-neutral-500 text-sm">{isActive ? "▲" : "▼"}</span>
      </div>
    </button>

    {isActive && (
      <div className="border-t border-neutral-700 p-4">
        {rel.roleInRelationship === "dom" ? <DomDashboard /> : <SubDashboard />}
      </div>
    )}
  </div>
);

export const SwitchDashboard = () => {
  const [relationships, setRelationships] = useState<Relationship[]>([
    // Placeholder data — replace with real API data when backend is wired
    // { id: "rel1", partnerName: "Alex", partnerId: "user456", roleInRelationship: "dom" },
  ]);
  const [activeRelId, setActiveRelId] = useState<string | null>(null);
  const [showLinkPrompt, setShowLinkPrompt] = useState(false);

  const toggleRole = (id: string) => {
    setRelationships(prev =>
      prev.map(r => r.id === id
        ? { ...r, roleInRelationship: r.roleInRelationship === "dom" ? "sub" : "dom" }
        : r
      )
    );
  };

  if (relationships.length === 0) {
    return <EmptyState onLink={() => setShowLinkPrompt(true)} />;
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Dynamics</h2>
        <button
          onClick={() => setShowLinkPrompt(true)}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm transition"
        >
          + Link Partner
        </button>
      </div>

      {showLinkPrompt && (
        <div className="bg-neutral-800 rounded-lg p-4 border border-purple-700 text-sm text-neutral-300">
          Partner linking is coming soon. This will let you search for a user and send a link request.
          <button onClick={() => setShowLinkPrompt(false)} className="ml-4 text-neutral-500 hover:text-white">Dismiss</button>
        </div>
      )}

      <div className="space-y-3">
        {relationships.map(rel => (
          <RelationshipCard
            key={rel.id}
            rel={rel}
            isActive={activeRelId === rel.id}
            onSelect={() => setActiveRelId(activeRelId === rel.id ? null : rel.id)}
            onToggleRole={toggleRole}
          />
        ))}
      </div>
    </div>
  );
};
