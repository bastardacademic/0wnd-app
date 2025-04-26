import React from "react";

export const BackupCodeList = ({ codes }) => {
  const downloadCodes = () => {
    const element = document.createElement("a");
    const file = new Blob([codes.join("\n")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "backup-codes.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="text-white space-y-2">
      <h3 className="text-lg font-bold">🧩 Backup Codes</h3>
      <ul className="bg-neutral-800 p-4 rounded space-y-1">
        {codes.map(c => (
          <li key={c} className="text-center font-mono text-purple-400">{c}</li>
        ))}
      </ul>
      <button onClick={downloadCodes} className="w-full p-2 bg-purple-700 rounded">Download Codes</button>
    </div>
  );
};
