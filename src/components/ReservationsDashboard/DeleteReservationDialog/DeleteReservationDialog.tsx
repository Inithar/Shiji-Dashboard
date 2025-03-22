import React from "react";
import { Trash2 } from "lucide-react";

import Button from "../../Button/Button.tsx";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../Dialog/Dialog.tsx";

import { useReservationBoardContext } from "../../../hooks/useReservationBoardContext.ts";
import { Reservation } from "../../../types/reservation.ts";

import styles from "./DeleteReservationDialog.module.css";

interface DeleteReservationDialogProps {
  reservation: Reservation;
  onClose: () => void;
}

const DeleteReservationDialog: React.FC<DeleteReservationDialogProps> = ({ reservation, onClose }) => {
  const [open, setOpen] = React.useState(false);

  const { deleteReservation } = useReservationBoardContext();

  function handleReservationDelete() {
    deleteReservation(reservation.id);
    setOpen(false);
  }

  function handleCancelButtonClick() {
    setOpen(false);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={styles.dialogTrigger}>
          Usuń
        </button>
      </DialogTrigger>

      <DialogContent className={styles.dialogContent} onCloseButtonClick={handleCancelButtonClick}>
        <div className={styles.iconBox} aria-hidden="true">
          <Trash2 />
        </div>

        <DialogTitle className={styles.dialogTitle}>
          Na pewno chcesz usunąć rezerwacje o numerze {reservation.id}?
        </DialogTitle>

        <div className={styles.actions}>
          <Button type="button" size="large" variant="outline" onClick={handleCancelButtonClick}>
            Anuluj
          </Button>
          <Button type="button" size="large" variant="destructive" onClick={handleReservationDelete}>
            Potwierdź
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReservationDialog;
