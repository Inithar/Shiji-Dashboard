import ReservationForm from "../../components/ReservationForm/ReservationForm.tsx";
import ReservationFormLayout from "../../layouts/ReservationFormLayout/ReservationFormLayout.tsx";

import { BASE_URL } from "../../constants/constants.ts";

const NewReservation = () => (
  <ReservationFormLayout
    title="Nowa Rezerwacja"
    description="Wypełnij poniższe dane, aby dodać nową rezerwację dla gościa hotelowego."
  >
    <ReservationForm
      submitButtonText="Dodaj rezerwację"
      mutationConfig={{
        url: `${BASE_URL}/reservations`,
        method: "POST",
        successMessage: "Pomyślnie utworzono rezerwacje",
        errorMessage: "Utworzenie rezerwacji nie powiodło się, spróbuj ponownie później"
      }}
    />
  </ReservationFormLayout>
);

export default NewReservation;
