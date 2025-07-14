import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = "", ...rest }: InputProps) {
  return (
    <input
      className={`border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
      {...rest}
    />
  );
}
