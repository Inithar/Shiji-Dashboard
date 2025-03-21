import { useContext } from "react";

import { ReservationBoardContext } from "../context/ReservationBoard.tsx";

export const useReservationBoardContext = () => {
  const context = useContext(ReservationBoardContext);

  if (context === null) {
    throw new Error("ReservationBoardContext was used outside of the ReservationBoardProvider");
  }

  return context;
};
