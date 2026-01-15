import { StrictMode } from "react";
import App from "./App";
import AdminPanel from "./components/adminPanel";
import { createRoot } from "react-dom/client";
import CotizadorSeguros from "./components/cotizadorSecures";
import UserDataForm from "./components/userDataForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cotizacion" element={<CotizadorSeguros />} />
        <Route path="/user" element={<UserDataForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  </StrictMode>
);
