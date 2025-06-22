import React from 'react';

interface Props { value: number; onChange: (v:number) => void; }
export const MoodSlider: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex items-center space-x-2">
    <span aria-label="Sad">😔</span>
    <input
      type="range" min={1} max={5}
      value={value}
      onChange={e => onChange(+e.target.value)}
      aria-valuemin={1} aria-valuemax={5} aria-valuenow={value}
      className="flex-1"
    />
    <span aria-label="Happy">😊</span>
  </div>
);