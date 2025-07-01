
import React from 'react';
import { TransformationOptionsState, TransformationOptionKey, OptionConfig } from '../types';
import { TRANSFORMATION_OPTIONS_CONFIG } from '../constants';

interface TransformationOptionsInputProps {
  options: TransformationOptionsState;
  onChange: (optionKey: TransformationOptionKey, value: boolean) => void;
}

const TransformationOptionsInput: React.FC<TransformationOptionsInputProps> = ({ options, onChange }) => {
  return (
    <div className="space-y-4 p-6 bg-slate-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-sky-400 mb-3">Transformation Techniques</h3>
      {TRANSFORMATION_OPTIONS_CONFIG.map((config: OptionConfig) => (
        <div key={config.id} className="flex items-start p-3 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors duration-150">
          <div className="flex items-center h-5">
            <input
              id={config.id}
              name={config.id}
              type="checkbox"
              checked={options[config.id]}
              onChange={(e) => onChange(config.id, e.target.checked)}
              className="focus:ring-sky-500 h-5 w-5 text-sky-600 border-slate-500 rounded bg-slate-600 cursor-pointer"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor={config.id} className="font-medium text-slate-100 cursor-pointer">
              {config.label}
            </label>
            <p className="text-slate-400 text-xs mt-1">{config.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransformationOptionsInput;
