import React, { useCallback, useMemo, useRef } from "react";
import toast from "react-hot-toast";

import useQuery from "../hooks/useQuery.ts";
import useMutate, { FetchOptions } from "../hooks/useMutate.ts";
import { mapResponseObjectToReservation } from "../utils/reservationUtils.ts";
import { BASE_URL } from "../constants/constants.ts";
import { Reservation, ReservationStatus } from "../types/reservation.ts";

interface ReservationBoardContextValue {
  reservations: Reservation[] | null;
  isLoading: boolean;
  error: string | null;
  draggedReservation: React.RefObject<Reservation | null>;
  updateReservationStatus: (reservationId: string, newStatus: ReservationStatus) => void;
  deleteReservation: (id: string) => void;
}

interface ReservationBoardProviderProps {
  children: React.ReactNode;
}

const RESERVATIONS_ENDPOINT = `${BASE_URL}/reservations`;

export const ReservationBoardContext = React.createContext<ReservationBoardContextValue | null>(null);

export const ReservationBoardProvider: React.FC<ReservationBoardProviderProps> = ({ children }) => {
  const draggedReservation = useRef<Reservation | null>(null);

  const {
    data: rawReservations,
    loading: isLoading,
    error,
    updateData
  } = useQuery<Reservation[] | null>(RESERVATIONS_ENDPOINT);

  const { mutate: updateReservation } = useMutate<Reservation>();
  const { mutate: deleteReservation } = useMutate<null>();

  const reservations = useMemo(() => {
    if (!rawReservations) {
      return null;
    }

    try {
      return rawReservations.map(mapResponseObjectToReservation);
    } catch (error) {
      console.error(`Błąd podczas przetwarzania danych rezerwacji: ${error}`);
      return null;
    }
  }, [rawReservations]);

  const handleStatusUpdate = useCallback(
    async (reservationId: string, newStatus: ReservationStatus) => {
      const url = `${RESERVATIONS_ENDPOINT}/${reservationId}`;

      const options: FetchOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      };

      try {
        await updateReservation(url, options);
        toast.success(`Pomyślnie zmieniono status rezerwacji nr. ${reservationId} na ${newStatus}`);

        updateData((currentData) => {
          if (!currentData) return currentData;

          return currentData.map((reservation) =>
            reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
          );
        });
      } catch (error) {
        toast.error(`Nie udało się zmienić status rezerwacji nr. ${reservationId} na ${newStatus}`);
        console.error(error);
      }
    },
    [updateReservation, updateData]
  );

  const handleDelete = useCallback(
    async (reservationId: string) => {
      const url = `${RESERVATIONS_ENDPOINT}/${reservationId}`;
      const options: FetchOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      };

      try {
        await deleteReservation(url, options);
        toast.success(`Pomyślnie usunięto rezerwajce nr. ${reservationId}`);

        updateData((currentData) => {
          if (!currentData) return currentData;

          return currentData.filter((reservation) => reservation.id !== reservationId);
        });
      } catch (error) {
        toast.error(`Failed to delete reservation #${reservationId}`);
        console.error(error);
      }
    },
    [deleteReservation, updateData]
  );

  const value = useMemo(
    () => ({
      reservations,
      isLoading,
      error,
      draggedReservation,
      updateReservationStatus: handleStatusUpdate,
      deleteReservation: handleDelete
    }),
    [reservations, isLoading, error, handleStatusUpdate, handleDelete]
  );

  return <ReservationBoardContext value={value}>{children}</ReservationBoardContext>;
};
