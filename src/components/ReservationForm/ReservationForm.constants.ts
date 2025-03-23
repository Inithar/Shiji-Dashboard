import { z } from "zod";

export const AVAILABLE_STATUS_TYPES = {
  RESERVED: { LABEL: "Reserved", VALUE: "Reserved" },
  DUE_IN: { LABEL: "Due in", VALUE: "Due In" }
} as const;

export const AVAILABLE_STATUS_TYPES_ARRAY = Object.values(AVAILABLE_STATUS_TYPES);

export const reservationSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  surname: z.string().min(1, "Nazwisko jest wymagane"),
  email: z.union([z.string().email("Nieprawidłowy adres email"), z.literal("")]).optional(),
  status: z.enum(AVAILABLE_STATUS_TYPES_ARRAY.map(({ VALUE }) => VALUE) as [string, ...string[]]),
  roomNumber: z.string().optional(),
  notes: z.string().optional(),
  arrivalDepartureDate: z
    .object({
      from: z.date(),
      to: z.date()
    })
    .refine((data) => data.to > data.from, "Data wyjazdu musi być późniejsza niż data przyjazdu")
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
