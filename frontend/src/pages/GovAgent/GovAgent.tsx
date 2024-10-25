import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";

function GovAgent() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
}

export default GovAgent;
