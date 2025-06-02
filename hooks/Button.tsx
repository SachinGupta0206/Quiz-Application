import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105
        bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
        ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;