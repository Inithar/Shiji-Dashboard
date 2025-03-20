import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import styles from "./Select.module.css";
import { Label } from "../Label/Label.tsx";

interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
  label: string;
  ref?: React.Ref<HTMLButtonElement> | undefined;
}

const Select: React.FC<SelectProps> = ({ label, children, ref, ...props }) => {
  const id = React.useId();

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>

      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger className={styles.trigger} id={id} ref={ref}>
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className={styles.icon}>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className={styles.content}>
            <SelectPrimitive.Viewport className={styles.viewport}>{children}</SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
};

const SelectItem: React.FC<React.ComponentProps<typeof SelectPrimitive.Item>> = ({ children, ref, ...props }) => (
  <SelectPrimitive.Item className={styles.item} ref={ref} {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
      <CheckIcon />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

export { SelectItem, Select };
