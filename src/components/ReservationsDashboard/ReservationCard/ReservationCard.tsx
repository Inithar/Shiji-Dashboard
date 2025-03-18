import React from "react";

import { formatDate } from "../../../utils/dateFormatters";
import { Reservation } from "../../../types/reservation";

import styles from "./ReservationCard.module.css";

interface ReservationCardProps {
  reservation: Reservation;
  statusColor: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, statusColor }) => {
  return (
    <div className={styles.reservationCard}>
      <div className={styles.cardStatusIndicator} style={{ backgroundColor: statusColor }}></div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.guestName}>{reservation.guestName}</h3>
          <div className={styles.actionButton}>
            <button className={styles.btnAction}>⋮</button>
          </div>
        </div>

        <div className={styles.stayDates}>
          <div className={styles.dateRange}>
            <span className={styles.dateLabel}>Przyjazd:</span>
            <span className={styles.dateValue}>{formatDate(reservation.checkInDate)}</span>
          </div>

          <div className={styles.dateRange}>
            <span className={styles.dateLabel}>Wyjazd:</span>
            <span className={styles.dateValue}>{formatDate(reservation.checkOutDate)}</span>
          </div>
        </div>

        {reservation.roomNumber && (
          <div className={styles.roomNumber}>
            <span className={styles.roomLabel}>Pokój:</span>
            <span className={styles.roomValue}>{reservation.roomNumber}</span>
          </div>
        )}

        {reservation.notes && (
          <div className={styles.notes}>
            <p>{reservation.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
