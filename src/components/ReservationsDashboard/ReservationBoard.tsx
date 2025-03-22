import React, { useMemo } from "react";

import Column from "./Column/Column.tsx";

import { Reservation, ReservationStatus } from "../../types/reservation";

import styles from "./ReservationBoard.module.css";

interface ReservationBoardProps {
  reservations: Reservation[];
}

const ReservationBoard: React.FC<ReservationBoardProps> = ({ reservations }) => {
  const statusColumns = useMemo(() => {
    const groups: Record<ReservationStatus, Reservation[]> = {
      Reserved: [],
      "Due In": [],
      "In House": [],
      "Due Out": [],
      "Checked Out": [],
      Canceled: [],
      "No Show": []
    };

    reservations.forEach((reservation) => {
      groups[reservation.status].push(reservation);
    });

    return Object.entries(groups);
  }, [reservations]);

  return (
    <div className={styles.reservationBoard}>
      {statusColumns.map(([status, reservations]) => (
        <Column key={status} status={status as ReservationStatus} reservations={reservations} />
      ))}
    </div>
  );
};

export default ReservationBoard;
