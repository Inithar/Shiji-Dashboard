import { useMemo } from "react";

import Header from "../../components/Header/Header.tsx";
import ReservationBoard from "../../components/ReservationsDashboard/ReservationBoard.tsx";

import useQuery from "../../hooks/useQuery.ts";
import { mapResponseObjectToReservation } from "../../utils/reservationUtils.ts";
import { Reservation } from "../../types/reservation.ts";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { data: reservations, loading, error } = useQuery<Reservation[]>("http://localhost:3000/reservations");

  const mappedReservations = useMemo(() => {
    if (!reservations) {
      return null;
    }

    try {
      return reservations.map(mapResponseObjectToReservation);
    } catch (error) {
      console.log(`Błąd podczas przetwarzania danych rezerwacji: ${error}`);
      return null;
    }
  }, [reservations]);

  if (loading) {
    return <div className={styles.loading}>Ładowanie danych rezerwacji...</div>;
  }

  if (error || !mappedReservations) {
    return <div>Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.</div>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <ReservationBoard reservations={mappedReservations} />
      </main>
    </div>
  );
};

export default Dashboard;
