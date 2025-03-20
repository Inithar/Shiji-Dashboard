import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";

import RangeDatePicker from "../RangeDatePicker/RangeDatePicker.tsx";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import { Select, SelectItem } from "../Select/Select.tsx";

import useMutate, { FetchOptions } from "../../hooks/useMutate.ts";
import { cleanData } from "../../utils/cleanData.ts";
import { getRangeDatePickerError, transformFormDataToReservation } from "./NewReservationFrom.utils.ts";
import {
  AVAILABLE_STATUS_TYPES,
  AVAILABLE_STATUS_TYPES_ARRAY,
  reservationSchema,
  ReservationFormData
} from "./NewReservationForm.constants.ts";
import { BASE_URL } from "../../constants/constants.ts";
import { Reservation } from "../../types/reservation.ts";

import styles from "./NewReservationForm.module.css";

const NewReservationForm = () => {
  const navigate = useNavigate();
  const { loading, mutate } = useMutate<Reservation>();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      status: AVAILABLE_STATUS_TYPES.RESERVED.value
    }
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
        toast.success("Reservation created successfully!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Coś poszło nie tak, spróbuj ponownie później");
      });
  }

  function handleCancelButtonClick() {
    reset();
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className={styles.subTitle}>Dane gościa</h2>

        <div className={styles.guestInfoRow}>
          <Input label="Imię" error={errors.name?.message} {...register("name")} />
          <Input label="Nazwisko" error={errors.surname?.message} {...register("surname")} />
        </div>

        <div className={styles.guestInfoRow}>
          <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
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
                error={getRangeDatePickerError(errors.arrivalDepartureDate)}
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
              <Select label="Status" error={errors.status?.message} value={field.value} onValueChange={field.onChange}>
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
          <Input label="Numer pokoju" error={errors.roomNumber?.message} {...register("roomNumber")} />
          <Input label="Notatki" error={errors.notes?.message} {...register("notes")} />
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" type="button" onClick={handleCancelButtonClick}>
          Anuluj
        </Button>
        <Button disabled={loading}>Dodaj rezerwacje</Button>
      </div>
    </form>
  );
};

export default NewReservationForm;
