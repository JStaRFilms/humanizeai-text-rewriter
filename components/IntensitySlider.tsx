
import React from 'react';

interface IntensitySliderProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}

const IntensitySlider: React.FC<IntensitySliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const getIntensityLabel = (val: number): string => {
    if (val <= 33) return 'Subtle';
    if (val <= 66) return 'Moderate';
    return 'Significant';
  };

  return (
    <div className="p-6 bg-slate-800 rounded-lg shadow-md">
      <label htmlFor="intensity" className="block text-xl font-semibold mb-3 text-sky-400">
        Transformation Intensity: <span className="text-sky-300">{getIntensityLabel(value)} ({value}%)</span>
      </label>
      <input
        id="intensity"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg accent-sky-500"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
};

export default IntensitySlider;
