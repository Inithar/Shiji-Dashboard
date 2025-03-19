import React from "react";

import styles from "./Input.module.css";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ref, ...delegated }) => (
  <div className={styles.container}>
    <label htmlFor={name} className={styles.label}>
      {label}
    </label>
    <input ref={ref} id={name} name={name} className={styles.input} {...delegated} />
  </div>
);

export default Input;
