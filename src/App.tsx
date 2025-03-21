import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import NewReservation from "./pages/NewReservation/NewReservation.tsx";
import EditReservation from "./pages/EditReservation/EditReservation.tsx";
import { ReservationBoardProvider } from "./context/ReservationBoard.tsx";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ReservationBoardProvider>
                <Dashboard />
              </ReservationBoardProvider>
            }
          />
          <Route path="/add" element={<NewReservation />} />
          <Route path="/edit" element={<EditReservation />} />
        </Route>
      </Routes>
    </BrowserRouter>

    <Toaster
      containerStyle={{ margin: "12px" }}
      toastOptions={{
        success: {
          duration: 3000
        },
        error: {
          duration: 5000
        },
        style: {
          fontSize: "1rem",
          maxWidth: "500px",
          padding: "16px 24px",
          textAlign: "center",
          gap: "12px",
          color: "hsl(var(--text-dark))"
        }
      }}
    />
  </>
);

export default App;
