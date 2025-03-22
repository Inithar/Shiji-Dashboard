import toast from "react-hot-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import ReservationFormLayout from "../../layouts/ReservationFormLayout/ReservationFormLayout.tsx";
import ReservationForm from "../../components/ReservationForm/ReservationForm.tsx";

import useQuery from "../../hooks/useQuery.ts";
import { BASE_URL, STATUS_ALLOWED_TO_EDIT } from "../../constants/constants.ts";
import { Reservation } from "../../types/reservation.ts";
import { transformReservationToFormData } from "./EditReservation.utils.ts";

const EditReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: reservation,
    loading: isLoading,
    error
  } = useQuery<Reservation | null>(`${BASE_URL}/reservations/${id}`);

  useEffect(() => {
    if (reservation && !STATUS_ALLOWED_TO_EDIT.includes(reservation.status)) {
      toast.error(`Nie można edytować rezerwacji w statusie: ${reservation.status}`);
      navigate("/");
    }
  }, [reservation, navigate]);

  if (isLoading) return <div>Loading...</div>;

  if (error || !reservation) return <div>Error...</div>;

  if (!STATUS_ALLOWED_TO_EDIT.includes(reservation.status)) {
    return null;
  }

  return (
    <ReservationFormLayout
      title="Edytuj Rezerwację"
      description="Zmodyfikuj poniższe dane, aby edytować istniejącą rezerwację."
    >
      <ReservationForm
        disabledFields={["arrivalDepartureDate", "status", "roomNumber"]}
        initialValues={transformReservationToFormData(reservation)}
        submitButtonText="Edytuj rezerwacje"
        mutationConfig={{
          url: `${BASE_URL}/reservations/${id}`,
          method: "PATCH",
          successMessage: `Pomyślnie edytowano rezerwacje nr. ${reservation.id}`,
          errorMessage: `Edytowanie rezerwacji nr. ${reservation.id} nie powiodło się, spróbuj ponownie później`
        }}
      />
    </ReservationFormLayout>
  );
};

export default EditReservation;
