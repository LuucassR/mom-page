import React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router";
import "./components.css"

const UserDataForm: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
    };

    try {
      await fetch("http://localhost:3000/userData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="h-screen bg-blue-600">
      <NavBar />
      <div className="flex-col bg-blue-600 mt-20 flex items-center justify-center p-6">
        <a href="/" className="text-white mb-5">{"<- home"}</a>
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Datos personales
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="nombre"
              placeholder="Nombre y Apellido"
              required
              className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              required
              className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="telefono"
              type="tel"
              placeholder="Número de celular"
              required
              className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg transition duration-150 hover:bg-blue-700 active:scale-95"
            >
              Enviar Datos
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDataForm;
