import { ReservationStatus } from "../types/reservation.ts";

export const BASE_URL = "http://localhost:3000";

export const STATUS_ALLOWED_TO_EDIT_RESERVATION: ReservationStatus[] = ["Reserved", "Due In"] as const;

export const STATUS_COLORS: Record<ReservationStatus, string> = {
  Reserved: "204, 70%, 53%",
  "Due In": "145, 63%, 49%",
  "In House": "282, 39%, 58%",
  "Due Out": "33, 89%, 51%",
  "Checked Out": "195, 8%, 56%",
  Canceled: "6, 78%, 57%",
  "No Show": "6, 64%, 46%"
} as const;

export const ALLOWED_STATUS_TRANSITIONS: Record<ReservationStatus, ReservationStatus[]> = {
  Reserved: ["Canceled", "Due In"],
  "Due In": ["Canceled", "No Show", "In House"],
  "In House": ["Checked Out"],
  "Due Out": [],
  "Checked Out": ["In House"],
  Canceled: ["Reserved"],
  "No Show": []
} as const;
