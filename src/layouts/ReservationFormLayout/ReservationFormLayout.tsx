import React from "react";
import styles from "./ReservationFormLayout.module.css";

type ReservationLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const ReservationFormLayout: React.FC<ReservationLayoutProps> = ({ title, description, children }) => (
  <main className={styles.wrapper}>
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>

    <div className={styles.separator} />

    {children}
  </main>
);

export default ReservationFormLayout;
