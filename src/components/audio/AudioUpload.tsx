import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const AudioUpload = () => {
  const { id } = useUser();
  const [subs, setSubs] = useState([]);
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    type: "praise",
    trigger: "manual",
    subId: ""
  });

  useEffect(() => {
    axios.get("/api/users", { headers: { "x-user-id": id } })
      .then(res => setSubs(res.data.filter(u => u.role === "sub" && u.domId === id)));
  }, [id]);

  const upload = async () => {
    if (!file) return alert("Please select an audio file");
    const reader = new FileReader();
    reader.onloadend = async () => {
      const audioUrl = reader.result;
      await axios.post("/api/audio", {
        ...meta,
        assignedBy: id,
        url: audioUrl
      });
      alert("Audio feedback uploaded.");
      setMeta({ title: "", type: "praise", trigger: "manual", subId: "" });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 text-white space-y-4">
      <h2 className="text-xl font-bold">Upload Audio Feedback</h2>
      <input value={meta.title} onChange={e => setMeta({ ...meta, title: e.target.value })} placeholder="Title" className="w-full p-2 bg-neutral-800 rounded" />
      <select value={meta.type} onChange={e => setMeta({ ...meta, type: e.target.value })} className="w-full p-2 bg-neutral-800 rounded">
        <option value="praise">Praise</option>
        <option value="discipline">Discipline</option>
        <option value="ambient">Ambient</option>
      </select>
      <select value={meta.trigger} onChange={e => setMeta({ ...meta, trigger: e.target.value })} className="w-full p-2 bg-neutral-800 rounded">
        <option value="manual">Manual</option>
        <option value="ritual">Ritual</option>
        <option value="reflection">Reflection</option>
        <option value="xp">XP Threshold</option>
      </select>
      <select value={meta.subId} onChange={e => setMeta({ ...meta, subId: e.target.value })} className="w-full p-2 bg-neutral-800 rounded">
        <option value="">Select Sub (optional)</option>
        {subs.map(sub => <option key={sub.id} value={sub.id}>{sub.displayName}</option>)}
      </select>
      <input type="file" accept="audio/*" onChange={e => setFile(e.target.files[0])} className="w-full" />
      <button onClick={upload} className="w-full p-2 bg-purple-700 text-white rounded">Upload</button>
    </div>
  );
};
