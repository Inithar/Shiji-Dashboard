import React from "react";
import { Link } from "react-router-dom";

import DeleteReservationDialog from "../DeleteReservationDialog/DeleteReservationDialog.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover/Popover.tsx";

import { STATUS_ALLOWED_TO_EDIT } from "../../../constants/constants.ts";
import { formatDate } from "../../../utils/dateFormatters";
import { Reservation } from "../../../types/reservation";

import styles from "./ReservationCard.module.css";

interface ReservationCardProps {
  reservation: Reservation;
  statusColor: string;
  handleDragStart: (reservation: Reservation) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, statusColor, handleDragStart }) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  return (
    <div className={styles.reservationCard} draggable="true" onDragStart={() => handleDragStart(reservation)}>
      <div className={styles.cardStatusIndicator} style={{ backgroundColor: `hsl(${statusColor})` }}></div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.guestName}>{reservation.guestName}</h3>

          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button className={styles.actionsTriggerBtn} type="button">
                ⋮
              </button>
            </PopoverTrigger>

            <PopoverContent className={styles.actionsContent}>
              {STATUS_ALLOWED_TO_EDIT.includes(reservation.status) ? (
                <Link to={`/edit/${reservation.id}`} className={styles.editReservationLink}>
                  Edytuj
                </Link>
              ) : null}

              <DeleteReservationDialog reservation={reservation} onClose={() => setIsPopoverOpen(false)} />
            </PopoverContent>
          </Popover>
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

export default React.memo(ReservationCard);
