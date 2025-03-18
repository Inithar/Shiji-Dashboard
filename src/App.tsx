import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import NewReservation from "./pages/NewReservation/NewReservation.tsx";
import EditReservation from "./pages/EditReservation/EditReservation.tsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<NewReservation />} />
      <Route path="/edit" element={<EditReservation />} />
    </Routes>
  </BrowserRouter>
);

export default App;
