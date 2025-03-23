import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import Tooltip from "../../components/Tooltip/Tooltip.tsx";
import ReservationBoard from "../../components/ReservationsDashboard/ReservationBoard.tsx";

import { useReservationBoardContext } from "../../hooks/useReservationBoardContext.ts";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { reservations, isLoading, error } = useReservationBoardContext();

  if (isLoading) {
    return <div className={styles.loading}>Ładowanie danych rezerwacji...</div>;
  }

  if (error || !reservations) {
    return <div>Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.</div>;
  }

  return (
    <main className={styles.mainContent}>
      <Tooltip content="Dodaj nową rezerwacje">
        <Link to="/add" className={styles.link} aria-label="Dodaj nową rezerwacje">
          <Plus aria-hidden="true" focusable="false" />
        </Link>
      </Tooltip>

      <ReservationBoard reservations={reservations} />
    </main>
  );
};

export default Dashboard;
