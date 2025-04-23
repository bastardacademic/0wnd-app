import React, { useState } from "react";
import { TagSelector } from "../shared/TagSelector";
import { IntensityToggle } from "../shared/IntensityToggle";
import { ProofCheckboxGroup } from "../shared/ProofCheckboxGroup";

export const ProtocolBuilder = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [intensity, setIntensity] = useState("medium");
  const [proof, setProof] = useState({ journal: false, photo: false, audio: false });

  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      tags,
      intensity,
      proofRequired: proof,
      isTemplate: true,
      visibility: "private"
    };

    console.log("Creating protocol:", payload);
    // TODO: POST to /api/rituals
  };

  return (
    <div className="space-y-4 p-6 rounded-xl border bg-neutral-900">
      <h3 className="text-xl font-bold text-white">Create Protocol</h3>

      <input
        type="text"
        className="w-full p-2 rounded bg-neutral-800 text-white"
        placeholder="Ritual Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 rounded bg-neutral-800 text-white"
        placeholder="Describe the ritual..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TagSelector selected={tags} onChange={setTags} />
      <IntensityToggle selected={intensity} onChange={setIntensity} />
      <ProofCheckboxGroup value={proof} onChange={setProof} />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
      >
        Save Ritual
      </button>
    </div>
  );
};
