import { StrictMode } from "react";
import App from "./App.tsx";
import AdminPanel from "./components/adminPanel.tsx";
import { createRoot } from "react-dom/client";
import CotizadorSeguros from "./components/cotizadorSecures.tsx";
import UserDataForm from "./components/userDataForm.tsx";
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
