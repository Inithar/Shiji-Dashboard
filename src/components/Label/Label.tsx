import React from "react";
import { Label as RadixLabel } from "@radix-ui/react-label";

import styles from "./Label.module.css";

const Label: React.FC<React.ComponentProps<typeof RadixLabel>> = ({ className, ref, ...delegated }) => (
  <RadixLabel ref={ref} className={`${styles.label} ${className}`} {...delegated} />
);

export { Label };
