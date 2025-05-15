import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        border: "1px solid #0070f3",
        background: "#0070f3",
        color: "#fff",
        cursor: "pointer",
        fontSize: "1rem",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 