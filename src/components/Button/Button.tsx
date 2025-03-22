import React from "react";

import styles from "./Button.module.css";

const SIZES = {
  medium: {
    "--border-radius": "6px",
    "--font-size": "1rem",
    "--padding": "8px 16px"
  },
  large: {
    "--border-radius": "8px",
    "--font-size": "1.1rem",
    "--padding": "12px 20px"
  }
};

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "outline" | "destructive";
  size?: keyof typeof SIZES;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "medium", children, className, ...delegated }) => (
  <button
    style={SIZES[size] as React.CSSProperties}
    className={`${styles.btn} ${styles[variant]} ${className}`}
    {...delegated}
  >
    {children}
  </button>
);

export default Button;
