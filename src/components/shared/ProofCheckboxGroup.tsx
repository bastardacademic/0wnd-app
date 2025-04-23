import React from "react";

export const ProofCheckboxGroup = ({ value, onChange }) => {
  const toggle = (key) => {
    onChange({ ...value, [key]: !value[key] });
  };
  return (
    <div className="flex gap-4">
      {["journal", "photo", "audio"].map((type) => (
        <label key={type} className="text-sm text-white">
          <input
            type="checkbox"
            checked={value[type]}
            onChange={() => toggle(type)}
            className="mr-1"
          />
          {type}
        </label>
      ))}
    </div>
  );
};
