import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./components.css"

interface Marca {
  Make_ID: number;
  Make_Name: string;
}

interface Modelo {
  Model_ID: number;
  Model_Name: string;
}

const API_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

const CotizadorSeguros: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [lists, setLists] = useState({
    marcas: [] as Marca[],
    modelos: [] as Modelo[],
    anios: [] as string[],
  });

  const [formData, setFormData] = useState({
    marca: "",
    marcaPersonalizada: "",
    modelo: "",
    modeloPersonalizado: "",
    anio: "",
    version: "",
    tieneGNC: false,
    es0km: false,
  });

  useEffect(() => {
    const fetchMarcas = async () => {
      const res = await fetch(`${API_BASE}/GetAllMakes?format=json`);
      const data = await res.json();

      const populares = [
        "TOYOTA",
        "VOLKSWAGEN",
        "FORD",
        "FIAT",
        "CHEVROLET",
        "RENAULT",
        "PEUGEOT",
        "HONDA",
      ];

      setLists((prev) => ({
        ...prev,
        marcas: data.Results.filter((m: Marca) =>
          populares.includes(m.Make_Name.toUpperCase())
        ),
      }));
    };

    const years: string[] = [];
    for (let y = new Date().getFullYear() + 1; y >= 1990; y--) {
      years.push(y.toString());
    }

    setLists((prev) => ({ ...prev, anios: years }));
    fetchMarcas();
  }, []);

  useEffect(() => {
    if (!formData.marca || formData.marca === "OTRO") {
      setLists((prev) => ({ ...prev, modelos: [] }));
      return;
    }

    const fetchModelos = async () => {
      setLoading(true);
      const res = await fetch(
        `${API_BASE}/GetModelsForMake/${formData.marca}?format=json`
      );
      const data = await res.json();
      setLists((prev) => ({ ...prev, modelos: data.Results }));
      setLoading(false);
    };

    fetchModelos();
  }, [formData.marca]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/carData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/user");
    }
  };

  return (
    <div className="min-h-screen bg-blue-600">
      <NavBar />
      <div className="flex flex-col mt-20 items-center justify-center p-5">
        <a href="/" className="text-white mb-4">
          {"<- home"}
        </a>
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Datos del vehículo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* SELECT MARCA */}
            <select
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-2xl"
            >
              <option value="">Seleccione una marca</option>
              {lists.marcas.map((m) => (
                <option key={m.Make_ID} value={m.Make_Name}>
                  {m.Make_Name}
                </option>
              ))}
              <option value="OTRO" className="font-bold text-blue-600">
                OTRO / NO FIGURA
              </option>
            </select>

            {/* INPUT MARCA PERSONALIZADA (Solo si elige OTRO) */}
            {formData.marca === "OTRO" && (
              <input
                name="marcaPersonalizada"
                placeholder="Escriba la marca"
                value={formData.marcaPersonalizada}
                onChange={handleChange}
                className="w-full p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl animate-pulse-once"
              />
            )}

            {/* SELECT MODELO */}
            <select
              name="modelo"
              disabled={
                (!formData.marca || loading) && formData.marca !== "OTRO"
              }
              value={formData.modelo}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-2xl disabled:opacity-50"
            >
              <option value="">
                {loading ? "Cargando..." : "Seleccione modelo"}
              </option>
              {lists.modelos.map((m) => (
                <option key={m.Model_ID} value={m.Model_Name}>
                  {m.Model_Name}
                </option>
              ))}
              <option value="OTRO" className="font-bold text-blue-600">
                OTRO / NO FIGURA
              </option>
            </select>

            {/* INPUT MODELO PERSONALIZADO */}
            {formData.modelo === "OTRO" && (
              <input
                name="modeloPersonalizado"
                placeholder="Escriba el modelo"
                value={formData.modeloPersonalizado}
                onChange={handleChange}
                className="w-full p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl"
              />
            )}

            {/* AÑO Y VERSIÓN (Igual que antes) */}
            <select
              name="anio"
              disabled={!formData.modelo}
              value={formData.anio}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-2xl"
            >
              <option value="">Seleccione año</option>
              {lists.anios.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <input
              name="version"
              placeholder="Versión (ej: 1.6 Full, Sport, etc.)"
              value={formData.version}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-2xl"
            />

            {/* ... (Toggles de 0km y GNC igual que antes) ... */}

            <button
              type="submit"
              disabled={
                !formData.version ||
                (formData.marca === "OTRO" && !formData.marcaPersonalizada)
              }
              className="w-full cursor-pointer active:scale-95 bg-blue-600 text-white py-4 rounded-full font-bold hover:bg-blue-700 disabled:bg-gray-300 transition-all"
            >
              Enviar cotización
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CotizadorSeguros;
