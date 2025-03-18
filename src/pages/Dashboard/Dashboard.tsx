import { useEffect, useState } from "react";

import Header from "../../components/Header/Header.tsx";
import ReservationBoard from "../../components/ReservationsDashboard/ReservationBoard.tsx";

import { mapResponseObjectToReservation } from "../../utils/reservationUtils.ts";
import { Reservation } from "../../types/reservation.ts";
import reservationsData from "../../data/reservations.json";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      try {
        const validReservations = reservationsData.map(mapResponseObjectToReservation);
        setReservations(validReservations);
      } catch (error) {
        console.error("Błąd podczas przetwarzania danych rezerwacji:", error);
      } finally {
        setLoading(false);
      }
    }, 800);
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        {loading ? (
          <div className={styles.loading}>Ładowanie danych rezerwacji...</div>
        ) : (
          <ReservationBoard reservations={reservations} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
