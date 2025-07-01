
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled = false,
  variant = 'primary',
  icon,
  isLoading = false,
}) => {
  const baseStyles = "px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center space-x-2";
  
  const variantStyles = {
    primary: `bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500 ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`,
    secondary: `bg-slate-600 hover:bg-slate-500 text-slate-100 focus:ring-slate-500 ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`,
    danger: `bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon}
      <span>{isLoading ? 'Processing...' : label}</span>
    </button>
  );
};

export default Button;
