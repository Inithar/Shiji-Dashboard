import React, { useMemo } from "react";

import Column from "./Column/Column.tsx";

import { Reservation, ReservationStatus } from "../../types/reservation";

import styles from "./ReservationBoard.module.css";

interface ReservationBoardProps {
  reservations: Reservation[];
}

const ReservationBoard: React.FC<ReservationBoardProps> = ({ reservations }) => {
  const groupedReservations = useMemo(() => {
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

    return groups;
  }, [reservations]);

  const memoizedGroupedReservations = useMemo(() => Object.entries(groupedReservations), [groupedReservations]);

  return (
    <div className={styles.reservationBoard}>
      {memoizedGroupedReservations.map(([status, reservationList]) => (
        <Column key={status} status={status as ReservationStatus} reservationList={reservationList} />
      ))}
    </div>
  );
};

export default ReservationBoard;
