import { Outlet } from "react-router";

import Header from "../../components/Header/Header.tsx";

import styles from "./MainLayout.module.css";

const MainLayout = () => (
  <div className={styles.container}>
    <Header />
    <Outlet />
  </div>
);

export default MainLayout;
