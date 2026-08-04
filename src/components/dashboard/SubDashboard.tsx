import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { RitualCard } from "../rituals/RitualCard";
import { RitualTracker } from "../rituals/RitualTracker";
import { DevotionMeter } from "../devotion/DevotionMeter";

type Ritual = { id: string; name?: string; title?: string; description?: string; time?: string; duration?: number };
type DevotionData = { level: string; xp: number };

export const SubDashboard = () => {
  const { id } = useUser();
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [devotion, setDevotion] = useState<DevotionData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const ritualsRes = await axios.get("/api/rituals/assigned", {
          headers: { "x-user-id": id }
        });
        setRituals(Array.isArray(ritualsRes.data) ? ritualsRes.data : []);
      } catch {
        setRituals([]);
      }

      try {
        const devotionRes = await axios.get(`/api/devotion/${id}`);
        setDevotion(devotionRes.data);
      } catch {
        setDevotion(null);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">Welcome, Sub</h2>

      <section>
        <h3 className="text-lg font-bold mb-2">Your Devotion</h3>
        {devotion ? <DevotionMeter data={devotion} /> : <p className="text-sm text-neutral-400">No devotion data yet.</p>}
      </section>

      <section>
        <h3 className="text-lg font-bold mb-2">Assigned Rituals</h3>
        {rituals.length === 0
          ? <p className="text-sm text-neutral-400">No rituals assigned yet.</p>
          : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {rituals.map((ritual) =>
                ritual.time && ritual.duration
                  ? <RitualTracker key={ritual.id} ritual={{ ...ritual, title: ritual.title ?? ritual.name }} />
                  : <RitualCard key={ritual.id} ritual={ritual} />
              )}
            </div>
          )
        }
      </section>
    </div>
  );
};
