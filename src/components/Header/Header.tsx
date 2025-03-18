import React from "react";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <h1>Dashboard Rezerwacji Hotelowych</h1>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.dateDisplay}>
            {new Date().toLocaleDateString("pl-PL", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
