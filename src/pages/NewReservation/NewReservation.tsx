import NewReservationForm from "../../components/NewReservationForm/NewReservationForm.tsx";

import styles from "./NewReservation.module.css";

const NewReservation = () => (
  <main className={styles.wrapper}>
    <div>
      <h1 className={styles.title}>Nowa Rezerwacja</h1>
      <p className={styles.description}>Wypełnij poniższe dane, aby dodać nową rezerwację dla gościa hotelowego.</p>
    </div>

    <div className={styles.separator} />

    <NewReservationForm />
  </main>
);

export default NewReservation;
