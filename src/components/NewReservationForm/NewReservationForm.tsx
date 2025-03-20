import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";

import RangeDatePicker from "../RangeDatePicker/RangeDatePicker.tsx";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import { Select, SelectItem } from "../Select/Select.tsx";

import useMutate, { FetchOptions } from "../../hooks/useMutate.ts";
import { cleanData } from "../../utils/cleanData.ts";
import {
  AVAILABLE_STATUS_TYPES,
  AVAILABLE_STATUS_TYPES_ARRAY,
  reservationSchema,
  ReservationFormData
} from "./NewReservationForm.constants.ts";
import { BASE_URL } from "../../constants/constants.ts";
import { Reservation } from "../../types/reservation.ts";

import styles from "./NewReservationForm.module.css";

const transformFormDataToReservation = (data: ReservationFormData) => ({
  guestName: `${data.name} ${data.surname}`,
  checkInDate: data.arrivalDepartureDate.from.toISOString(),
  checkOutDate: data.arrivalDepartureDate.to.toISOString(),
  status: data.status,
  roomNumber: data.roomNumber,
  notes: data.notes,
  email: data.email
});

const NewReservationForm = () => {
  const navigate = useNavigate();
  const { loading, error, mutate } = useMutate<Reservation>();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema)
  });

  const arrivalDate = watch("arrivalDepartureDate");
  const isArrivalToday = arrivalDate && new Date(arrivalDate.from).toDateString() === new Date().toDateString();

  function onSubmit(data: ReservationFormData) {
    const url = `${BASE_URL}/reservations`;

    const transformedData = transformFormDataToReservation(data);
    const cleanedData = cleanData(transformedData);

    const options: FetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cleanedData)
    };

    mutate(url, options)
      .then(() => {
        navigate("/");
        console.log("Reservation created successfully!");
      })
      .catch((err) => {
        console.error("Error creating reservation:", err);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className={styles.subTitle}>Dane gościa</h2>

        <div className={styles.guestInfoRow}>
          <Input label="Imię" {...register("name")} />
          <Input label="Nazwisko" {...register("surname")} />
        </div>

        <div className={styles.guestInfoRow}>
          <Input label="Email" type="email" {...register("email")} />
        </div>
      </div>

      <div className={styles.reservationDetails}>
        <h2 className={styles.subTitle}>Szczegóły rezerwacji</h2>

        <div className={styles.reservationDetailsRow}>
          <Controller
            name="arrivalDepartureDate"
            control={control}
            render={({ field }) => (
              <RangeDatePicker
                label="Data przyjazdu - Data wyjazdu"
                disabled={{ before: new Date() }}
                numberOfMonths={2}
                selected={field.value}
                onSelect={field.onChange}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select label="Status" value={field.value} onValueChange={field.onChange}>
                {AVAILABLE_STATUS_TYPES_ARRAY.map(({ label, value }, index) => (
                  <SelectItem
                    key={index}
                    value={value}
                    disabled={value === AVAILABLE_STATUS_TYPES.DUE_IN.value && !isArrivalToday}
                  >
                    {label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>

        <div className={styles.reservationDetailsRow}>
          <Input label="Numer pokoju" {...register("roomNumber")} />
          <Input label="Notatki" {...register("notes")} />
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" type="button">
          Anuluj
        </Button>
        <Button disabled={loading}>Dodaj rezerwacje</Button>
      </div>
    </form>
  );
};

export default NewReservationForm;
