import React, { useCallback, useMemo, useRef } from "react";
import toast from "react-hot-toast";

import useQuery from "../hooks/useQuery.ts";
import useMutate, { FetchOptions } from "../hooks/useMutate.ts";
import { mapResponseObjectToReservation } from "../utils/reservationUtils.ts";
import { BASE_URL } from "../constants/constants.ts";
import { Reservation, ReservationStatus } from "../types/reservation.ts";

interface ReservationBoardContext {
  reservations: Reservation[] | null;
  isReservationsLoading: boolean;
  reservationsError: string | null;
  draggedReservationRef: React.RefObject<Reservation | null>;
  handleReservationStatusUpdate: (reservationId: string, newStatus: ReservationStatus) => void;
  deleteReservation: (id: string) => void;
}

export const ReservationBoardContext = React.createContext<ReservationBoardContext | null>(null);

export const ReservationBoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const draggedReservationRef = useRef<Reservation>(null);

  const {
    data: reservations,
    loading,
    error,
    updateData
  } = useQuery<Reservation[] | null>("http://localhost:3000/reservations");

  const { mutate: updateReservationApi } = useMutate<Reservation>();
  const { mutate: deleteReservationApi } = useMutate<Reservation>();

  const mappedReservations = useMemo(() => {
    if (!reservations) {
      return null;
    }

    try {
      return reservations.map(mapResponseObjectToReservation);
    } catch (error) {
      console.error(`Błąd podczas przetwarzania danych rezerwacji: ${error}`);
      return null;
    }
  }, [reservations]);

  const handleReservationStatusUpdate = useCallback(
    (reservationId: string, newStatus: ReservationStatus) => {
      const url = `${BASE_URL}/reservations/${reservationId}`;

      const options: FetchOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      };

      updateReservationApi(url, options)
        .then(() => {
          toast.success(`Pomyślnie zmieniono status rezerwacji nr. ${reservationId} na ${newStatus}`);

          updateData((currentData) => {
            if (!currentData) return currentData;

            return currentData.map((reservation) =>
              reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
            );
          });
        })
        .catch(() => {
          toast.error(`Nie udało się zmienić status rezerwacji nr. ${reservationId} na ${newStatus}`);
        });
    },
    [updateReservationApi, updateData]
  );

  const deleteReservation = useCallback(
    (id: string) => {
      const url = `${BASE_URL}/reservations/${id}`;

      const options: FetchOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      };

      deleteReservationApi(url, options)
        .then(() => {
          toast.success(`Pomyślnie usunięto rezerwajce nr. ${id}`);

          updateData((currentData) => {
            if (!currentData) return currentData;

            return currentData.filter((reservation) => reservation.id !== id);
          });
        })
        .catch(() => {
          toast.error(`Nie udało się usunąć rezerwacji nr. ${id}. Spróbuj ponownie później.`);
        });
    },
    [deleteReservationApi, updateData]
  );

  const value = useMemo(
    () => ({
      reservations: mappedReservations,
      isReservationsLoading: loading,
      reservationsError: error,
      draggedReservationRef,
      handleReservationStatusUpdate,
      deleteReservation
    }),
    [mappedReservations, loading, error, handleReservationStatusUpdate, deleteReservation]
  );

  return <ReservationBoardContext value={value}>{children}</ReservationBoardContext>;
};
