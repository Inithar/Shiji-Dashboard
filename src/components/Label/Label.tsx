import React from "react";
import { Label as RadixLabel } from "@radix-ui/react-label";

import styles from "./Label.module.css";

interface LabelProps extends React.ComponentProps<typeof RadixLabel> {
  isError?: boolean;
}

const Label: React.FC<LabelProps> = ({ className, ref, isError, ...delegated }) => (
  <RadixLabel ref={ref} className={`${styles.label} ${isError && styles.error} ${className}`} {...delegated} />
);

export { Label };
