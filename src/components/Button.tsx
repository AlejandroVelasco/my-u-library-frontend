import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded shadow hover:shadow-md bg-blue-600 text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
