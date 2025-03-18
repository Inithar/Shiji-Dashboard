import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import NewReservation from "./pages/NewReservation/NewReservation.tsx";
import EditReservation from "./pages/EditReservation/EditReservation.tsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<NewReservation />} />
        <Route path="/edit" element={<EditReservation />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
