import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";

import ReservationCard from "../ReservationCard/ReservationCard.tsx";

import { useReservationBoardContext } from "../../../hooks/useReservationBoardContext.ts";
import { allowedTransitions, statusColors } from "./Column.constants.ts";
import { Reservation, ReservationStatus } from "../../../types/reservation.ts";

import styles from "./Column.module.css";

interface ColumnProps {
  status: ReservationStatus;
  reservationList: Reservation[];
}

const isValidTransition = (originalStatus: ReservationStatus, newStatus: ReservationStatus) =>
  allowedTransitions[originalStatus].includes(newStatus);

const Column: React.FC<ColumnProps> = ({ status, reservationList }) => {
  const [isActive, setIsActive] = useState(false);

  const { draggedReservationRef, handleReservationStatusUpdate } = useReservationBoardContext();

  const columnRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (reservation: Reservation) => {
      draggedReservationRef.current = reservation;
    },
    [draggedReservationRef]
  );

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    if (draggedReservationRef.current) {
      const originalStatus = draggedReservationRef.current.status;

      if (isValidTransition(originalStatus, status)) {
        setIsActive(true);
      }
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (columnRef.current && e.relatedTarget && !columnRef.current.contains(e.relatedTarget as Node)) {
      setIsActive(false);
    }
  }

  function handleDrop() {
    if (!draggedReservationRef.current) return;

    const originalStatus = draggedReservationRef.current.status;
    const reservationId = draggedReservationRef.current.id;

    if (originalStatus === status) return;

    if (!isValidTransition(originalStatus, status)) {
      toast.error(`Nie można zmienić statusu rezerwacji z ${originalStatus} na ${status}`);
      return;
    }

    handleReservationStatusUpdate(reservationId, status);
    setIsActive(false);
  }

  return (
    <div
      ref={columnRef}
      key={status}
      className={`${styles.statusColumn}`}
      style={{ backgroundColor: isActive ? `hsla(${statusColors[status]}, 0.2)` : "hsl(var(--white))" }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={styles.statusHeader} style={{ backgroundColor: `hsl(${statusColors[status]}` }}>
        <h2>{status}</h2>
        <span className={styles.reservationCount}>{reservationList.length}</span>
      </div>

      <div className={styles.reservationList}>
        {reservationList.map((reservation) => (
          <ReservationCard
            handleDragStart={handleDragStart}
            key={reservation.id}
            reservation={reservation}
            statusColor={statusColors[reservation.status]}
          />
        ))}

        {reservationList.length === 0 && <div className={styles.emptyStatus}>Brak rezerwacji</div>}
      </div>
    </div>
  );
};

export default React.memo(Column);
