import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const PromptFavourites = () => {
  const { id } = useUser();
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    async function loadFavs() {
      const res = await axios.get("/api/favourites", {
        headers: { "x-user-id": id }
      });
      setFavs(res.data);
    }
    loadFavs();
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">💜 Your Favourite Prompts</h2>
      {favs.length === 0 && <p className="text-gray-400">No favourites yet.</p>}
      <ul className="space-y-2">
        {favs.map(p => (
          <li key={p.id} className="bg-neutral-800 p-3 rounded">{p.text}</li>
        ))}
      </ul>
    </div>
  );
};
