import ReservationBoard from "../../components/ReservationsDashboard/ReservationBoard.tsx";

import { useReservationBoardContext } from "../../hooks/useReservationBoardContext.ts";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { reservations, isReservationsLoading, reservationsError } = useReservationBoardContext();

  if (isReservationsLoading) {
    return <div className={styles.loading}>Ładowanie danych rezerwacji...</div>;
  }

  if (reservationsError || !reservations) {
    return <div>Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.</div>;
  }

  return (
    <main className={styles.mainContent}>
      <ReservationBoard reservations={reservations} />
    </main>
  );
};

export default Dashboard;
