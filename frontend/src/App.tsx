import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import GovAgent from "./pages/GovAgent";
import SaccoAdmin from "./pages/SaccoAdmin";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/govagent" element={<GovAgent />} />
          <Route path="/saccoadmin" element={<SaccoAdmin />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
