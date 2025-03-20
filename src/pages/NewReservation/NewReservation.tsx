import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import RangeDatePicker from "../../components/RangeDatePicker/RangeDatePicker.tsx";
import { Select, SelectItem } from "../../components/Select/Select.tsx";

import styles from "./NewReservation.module.css";

const AVAILABLE_STATUS_TYPES = [
  { label: "Reserved", value: "reserved" },
  { label: "Due in", value: "due-in" }
] as const;

const statusValues = AVAILABLE_STATUS_TYPES.map((status) => status.value) as [string, ...string[]];

const reservationSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  surname: z.string().min(1, "Nazwisko jest wymagane"),
  email: z.string().email("Nieprawidłowy adres email").optional(),
  arrivalDepartureDate: z
    .object({
      from: z.date(),
      to: z.date()
    })
    .refine((data) => data.to > data.from, "Data wyjazdu musi być późniejsza niż data przyjazdu"),
  status: z.enum(statusValues),
  roomNumber: z.string().optional(),
  notes: z.string().optional()
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

const NewReservation = () => {
  const { register, handleSubmit, control } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema)
  });

  function onSubmit(data: ReservationFormData) {
    console.log(data);
  }

  return (
    <main className={styles.wrapper}>
      <div>
        <h1 className={styles.title}>Nowa Rezerwacja</h1>
        <p className={styles.description}>Wypełnij poniższe dane, aby dodać nową rezerwację dla gościa hotelowego.</p>
      </div>

      <div className={styles.separator} />

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
                <Select label="Status" defaultValue="2" value={field.value} onValueChange={field.onChange}>
                  {AVAILABLE_STATUS_TYPES.map(({ label, value }, index) => (
                    <SelectItem key={index} value={value}>
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
          <Button>Dodaj rezerwacje</Button>
        </div>
      </form>
    </main>
  );
};

export default NewReservation;
