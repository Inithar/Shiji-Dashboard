import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import styles from "./Tooltip.module.css";

interface TooltipProps extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, open, defaultOpen, onOpenChange, ...delegated }) => (
  <TooltipPrimitive.Provider delayDuration={300}>
    <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content side="top" align="center" className={styles.content} {...delegated}>
        {content}
        <TooltipPrimitive.Arrow width={11} height={5} className={styles.arrow} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);

export default Tooltip;
