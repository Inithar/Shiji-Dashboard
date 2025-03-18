import { useEffect, useState } from "react";
import { Reservation } from "../../types/reservation.ts";
import reservationsData from "../../data/reservations.json";
import { mapResponseObjectToReservation } from "../../utils/reservationUtils.ts";
import Header from "../../components/Header/Header.tsx";
import ReservationBoard from "../../components/ReservationsDashboard/ReservationBoard.tsx";

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
    <div className="app-container">
      <Header />
      <main className="main-content">
        {loading ? (
          <div className="loading">Ładowanie danych rezerwacji...</div>
        ) : (
          <ReservationBoard reservations={reservations} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
