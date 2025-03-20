import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import styles from "./Popover.module.css";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = ({
  align = "center",
  sideOffset = 4,
  className,
  children,
  ref,
  ...delegated
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={`${styles.popoverContent} ${className}`}
      ref={ref}
      {...delegated}
    >
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
);

export { Popover, PopoverTrigger, PopoverContent };
