
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></div>
      <p className="ml-4 text-lg text-slate-300">Processing your text...</p>
    </div>
  );
};

export default LoadingSpinner;
