import React from "react";

import styles from "./Input.module.css";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, error, ref, ...delegated }) => (
  <div className={styles.container}>
    <label htmlFor={name} className={`${styles.label} ${error && styles.error}`}>
      {label}
    </label>

    <input
      ref={ref}
      id={name}
      name={name}
      className={styles.input}
      aria-describedby={error && `${name}-error`}
      aria-invalid={Boolean(error)}
      {...delegated}
    />

    {error ? (
      <p className={styles.errorMessage} id={`${name}-error`}>
        {error}
      </p>
    ) : null}
  </div>
);

export default Input;
