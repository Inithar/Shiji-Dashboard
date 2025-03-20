import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import { ReservationFormData } from "./NewReservationForm.constants.ts";

type RangeDatePickerError = Merge<FieldError, FieldErrorsImpl<{ from: Date; to: Date }>> | undefined;

export const transformFormDataToReservation = (data: ReservationFormData) => ({
  guestName: `${data.name} ${data.surname}`,
  checkInDate: data.arrivalDepartureDate.from.toISOString(),
  checkOutDate: data.arrivalDepartureDate.to.toISOString(),
  status: data.status,
  roomNumber: data.roomNumber,
  notes: data.notes,
  email: data.email
});

export function getRangeDatePickerError(error: RangeDatePickerError) {
  if (error?.type === "invalid_type") {
    return "Data przyjazdu i wyjazdu jest wymagana";
  }

  if (error?.message) {
    return error.message;
  }

  return undefined;
}
