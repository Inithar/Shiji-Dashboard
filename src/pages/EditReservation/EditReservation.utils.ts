import { Reservation } from "../../types/reservation.ts";

export const transformReservationToFormData = (reservation: Reservation) => {
  const [name, surname] = reservation.guestName.split(" ");

  return {
    name: name || "",
    surname: surname || "",
    arrivalDepartureDate: {
      from: new Date(reservation.checkInDate),
      to: new Date(reservation.checkOutDate)
    },
    status: reservation.status,
    roomNumber: reservation.roomNumber,
    notes: reservation.notes || "",
    email: reservation.email
  };
};
