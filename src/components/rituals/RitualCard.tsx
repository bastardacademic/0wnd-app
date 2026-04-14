type Ritual = {
  id: string;
  name?: string;
  title?: string;
  description?: string;
};

export const RitualCard = ({ ritual }: { ritual: Ritual }) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-white">{ritual.name ?? ritual.title ?? "Untitled Ritual"}</h4>
      {ritual.description && (
        <p className="text-sm text-neutral-400">{ritual.description}</p>
      )}
    </div>
  );
};
