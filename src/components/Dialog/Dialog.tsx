import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

import styles from "./Dialog.module.css";

interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  onCloseButtonClick?: () => void;
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent: React.FC<DialogContentProps> = ({
  className,
  onCloseButtonClick,
  children,
  ref,
  ...delegated
}) => {
  const closeButtonProps: React.ComponentProps<typeof DialogPrimitive.Close> = {};

  if (onCloseButtonClick) {
    closeButtonProps.onClick = onCloseButtonClick;
  }

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content className={`${styles.content} ${className}`} {...delegated} ref={ref}>
        {children}

        <DialogPrimitive.Close className={styles.iconButton} aria-label="Close" {...closeButtonProps}>
          <Cross1Icon aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export const DialogTitle: React.FC<React.ComponentProps<typeof DialogPrimitive.Title>> = ({
  children,
  className,
  ...delegated
}) => (
  <DialogPrimitive.Title className={`${styles.title} ${className}`} {...delegated}>
    {children}
  </DialogPrimitive.Title>
);

export const DialogDescription: React.FC<React.ComponentProps<typeof DialogPrimitive.Description>> = ({
  children,
  className,
  ...delegated
}) => (
  <DialogPrimitive.Description className={`${styles.description} ${className}`} {...delegated}>
    {children}
  </DialogPrimitive.Description>
);
