import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { RitualCard } from "../rituals/RitualCard";
import { DevotionMeter } from "../devotion/DevotionMeter";
import { JournalEditor } from "../journal/JournalEditor";

export const SubDashboard = () => {
  const { id } = useUser();
  const [rituals, setRituals] = useState([]);
  const [devotion, setDevotion] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const ritualsRes = await axios.get("/api/rituals/assigned", {
          headers: { "x-user-id": id }
        });
        setRituals(ritualsRes.data);

        const devotionRes = await axios.get(`/api/devotion/${id}`);
        setDevotion(devotionRes.data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">Welcome, Sub</h2>

      <section>
        <h3 className="text-lg font-bold mb-2">Your Devotion</h3>
        {devotion ? <DevotionMeter data={devotion} /> : <p>Loading...</p>}
      </section>

      <section>
        <h3 className="text-lg font-bold mb-2">Assigned Rituals</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rituals.map((ritual) => (
            <RitualCard key={ritual.id} ritual={ritual} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-2">Reflect & Log</h3>
        <JournalEditor />
      </section>
    </div>
  );
};
