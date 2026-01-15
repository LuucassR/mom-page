import { StrictMode } from "react";
import App from "./App.tsx";
import Cotizador from "./components/cotizacion.tsx";
import AdminPanel from "./components/adminPanel.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cotizacion" element={<Cotizador />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  </StrictMode>
);
