import React from "react";

export const MediaUploader = ({ onUpload }) => {
  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f, i) => URL.createObjectURL(f)); // Fake URLs
    onUpload(urls);
  };
  return (
    <div className="text-sm text-white">
      <label className="block mb-1">Attach Media</label>
      <input
        type="file"
        accept="image/*,audio/*,video/*"
        multiple
        onChange={handleChange}
        className="block text-sm"
      />
    </div>
  );
};
