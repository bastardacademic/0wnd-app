import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { FlairPicker } from "./FlairPicker";

export const ProfileSettings = () => {
  const { id } = useUser();
  const [form, setForm] = useState({ flair: "", pronouns: "", theme: "dark" });

  useEffect(() => {
    axios.get("/api/users", { headers: { "x-user-id": id } })
      .then(res => {
        const me = res.data.find(u => u.id === id);
        setForm({ flair: me.flair || "", pronouns: me.pronouns || "", theme: me.theme || "dark" });
      });
  }, [id]);

  const save = async () => {
    await axios.patch("/api/user", form, { headers: { "x-user-id": id } });
    alert("Profile updated");
  };

  return (
    <div className="p-4 space-y-4 text-white">
      <h2 className="text-xl font-bold">Profile Settings</h2>
      <FlairPicker flair={form.flair} setFlair={f => setForm({ ...form, flair: f })} />
      <input value={form.pronouns} onChange={e => setForm({ ...form, pronouns: e.target.value })} placeholder="Pronouns" className="w-full p-2 bg-neutral-800 rounded" />
      <select value={form.theme} onChange={e => setForm({ ...form, theme: e.target.value })} className="w-full p-2 bg-neutral-800 rounded">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <button onClick={save} className="w-full p-2 bg-purple-700 text-white rounded">Save</button>
    </div>
  );
};
