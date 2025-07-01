
import React from 'react';

interface TextAreaInputProps {
  id: string;
  label: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  isReadOnly?: boolean;
  rows?: number;
  labelColorClass?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  isReadOnly = false,
  rows = 8,
  labelColorClass = 'text-sky-400',
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className={`block text-lg font-semibold mb-2 ${labelColorClass}`}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={isReadOnly}
        rows={rows}
        className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out placeholder-slate-400 text-slate-100 resize-y"
      />
    </div>
  );
};

export default TextAreaInput;
