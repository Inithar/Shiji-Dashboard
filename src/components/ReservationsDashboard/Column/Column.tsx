import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";

import ReservationCard from "../ReservationCard/ReservationCard.tsx";

import { useReservationBoardContext } from "../../../hooks/useReservationBoardContext.ts";
import { ALLOWED_STATUS_TRANSITIONS, STATUS_COLORS } from "../../../constants/constants.ts";
import { Reservation, ReservationStatus } from "../../../types/reservation.ts";

import styles from "./Column.module.css";

interface ColumnProps {
  status: ReservationStatus;
  reservations: Reservation[];
}

const Column: React.FC<ColumnProps> = ({ status, reservations }) => {
  const [isActive, setIsActive] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);

  const { draggedReservation, updateReservationStatus } = useReservationBoardContext();

  const isValidTransition = (originalStatus: ReservationStatus) =>
    ALLOWED_STATUS_TRANSITIONS[originalStatus].includes(status);

  const handleDragStart = useCallback(
    (reservation: Reservation) => {
      draggedReservation.current = reservation;
    },
    [draggedReservation]
  );

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    if (draggedReservation.current) {
      const originalStatus = draggedReservation.current.status;

      if (isValidTransition(originalStatus)) {
        setIsActive(true);
      }
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (!columnRef.current?.contains(e.relatedTarget as Node)) {
      setIsActive(false);
    }
  }

  function handleDrop() {
    if (!draggedReservation.current) return;

    const { id, status: originalStatus } = draggedReservation.current;

    if (originalStatus === status) return;

    if (!isValidTransition(originalStatus)) {
      toast.error(`Nie można zmienić statusu rezerwacji z ${originalStatus} na ${status}`);
      return;
    }

    updateReservationStatus(id, status);
    setIsActive(false);
  }

  return (
    <div
      ref={columnRef}
      key={status}
      className={`${styles.statusColumn}`}
      style={{ backgroundColor: isActive ? `hsla(${STATUS_COLORS[status]}, 0.2)` : "hsl(var(--white))" }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={styles.statusHeader} style={{ backgroundColor: `hsl(${STATUS_COLORS[status]}` }}>
        <h2>{status}</h2>
        <span className={styles.reservationCount}>{reservations.length}</span>
      </div>

      <div className={styles.reservations}>
        {reservations.map((reservation) => (
          <ReservationCard
            handleDragStart={handleDragStart}
            key={reservation.id}
            reservation={reservation}
            statusColor={STATUS_COLORS[reservation.status]}
          />
        ))}

        {reservations.length === 0 && <div className={styles.emptyStatus}>Brak rezerwacji</div>}
      </div>
    </div>
  );
};

export default React.memo(Column);
