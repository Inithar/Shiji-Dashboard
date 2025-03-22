import { ReservationStatus } from "../types/reservation.ts";

export const BASE_URL = "http://localhost:3000";

export const STATUS_ALLOWED_TO_EDIT: ReservationStatus[] = ["Reserved", "Due In"];
