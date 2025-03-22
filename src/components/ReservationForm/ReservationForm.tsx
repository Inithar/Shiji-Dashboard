import React from "react";
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
import { getRangeDatePickerError, transformFormDataToReservation } from "./ReservationFrom.utils.ts";
import {
  AVAILABLE_STATUS_TYPES,
  AVAILABLE_STATUS_TYPES_ARRAY,
  reservationSchema,
  ReservationFormData
} from "./ReservationForm.constants.ts";
import { Reservation } from "../../types/reservation.ts";

import styles from "./ReservationForm.module.css";

interface MutationConfig {
  url: string;
  method: "POST" | "PATCH";
  successMessage: string;
  errorMessage: string;
}

interface ReservationFormProps {
  initialValues?: Partial<ReservationFormData>;
  mutationConfig: MutationConfig;
  submitButtonText: string;
  disabledFields?: (keyof ReservationFormData)[];
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  initialValues,
  mutationConfig,
  submitButtonText,
  disabledFields = []
}) => {
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
      status: AVAILABLE_STATUS_TYPES.RESERVED.value,
      ...initialValues
    }
  });

  const arrivalDate = watch("arrivalDepartureDate");
  const isArrivalToday = arrivalDate && new Date(arrivalDate.from).toDateString() === new Date().toDateString();

  async function onSubmit(data: ReservationFormData) {
    const transformedData = transformFormDataToReservation(data);
    const cleanedData = cleanData(transformedData);

    const options: FetchOptions = {
      method: mutationConfig.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cleanedData)
    };

    try {
      await mutate(mutationConfig.url, options);

      toast.success(mutationConfig.successMessage);
      navigate("/");
    } catch (error) {
      toast.error(mutationConfig.errorMessage);
    }
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
          <Input
            label="Imię"
            error={errors.name?.message}
            disabled={disabledFields.includes("name")}
            {...register("name")}
          />

          <Input
            label="Nazwisko"
            error={errors.surname?.message}
            disabled={disabledFields.includes("surname")}
            {...register("surname")}
          />
        </div>

        <div className={styles.guestInfoRow}>
          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            disabled={disabledFields.includes("email")}
            {...register("email")}
          />
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
                disableTrigger={disabledFields.includes("arrivalDepartureDate")}
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
              <Select
                label="Status"
                error={errors.status?.message}
                value={field.value}
                onValueChange={field.onChange}
                disabled={disabledFields.includes("status")}
              >
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
          <Input
            label="Numer pokoju"
            error={errors.roomNumber?.message}
            disabled={disabledFields.includes("roomNumber")}
            {...register("roomNumber")}
          />

          <Input
            label="Notatki"
            error={errors.notes?.message}
            disabled={disabledFields.includes("notes")}
            {...register("notes")}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" type="button" onClick={handleCancelButtonClick}>
          Anuluj
        </Button>
        <Button disabled={loading}>{submitButtonText}</Button>
      </div>
    </form>
  );
};

export default ReservationForm;
