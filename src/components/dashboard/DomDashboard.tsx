import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { RitualCard } from "../rituals/RitualCard";
import { ProtocolBuilder } from "../rituals/ProtocolBuilder";

export const DomDashboard = () => {
  const { id } = useUser();
  const [myRituals, setMyRituals] = useState([]);
  const [subs, setSubs] = useState([]);
  const [showBuilder, setShowBuilder] = useState(false);

  const refreshRituals = async () => {
    const res = await axios.get("/api/rituals/created", {
      headers: { "x-user-id": id }
    });
    setMyRituals(res.data);
  };

  useEffect(() => {
    async function fetchDomData() {
      await refreshRituals();
      const subsRes = await axios.get("/api/users/subs", {
        headers: { "x-user-id": id }
      });
      setSubs(subsRes.data);
    }

    fetchDomData();
  }, [id]);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">Dominant Control Panel</h2>

      <section>
        <h3 className="text-lg font-bold mb-2">Your Assigned Subs</h3>
        <ul className="pl-4 list-disc text-sm">
          {subs.map((sub) => (
            <li key={sub.id}>{sub.displayName} ({sub.id})</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-2">Rituals You Created</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myRituals.map((ritual) => (
            <RitualCard key={ritual.id} ritual={ritual} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-2">Create New Ritual</h3>
        <button
          onClick={() => setShowBuilder(!showBuilder)}
          className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
        >
          {showBuilder ? "Close Builder" : "Open Protocol Builder"}
        </button>

        {showBuilder && (
          <div className="mt-4">
            <ProtocolBuilder onSubmitSuccess={refreshRituals} />
          </div>
        )}
      </section>
    </div>
  );
};
