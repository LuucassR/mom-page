import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

// --- Interfaces para TypeScript ---
interface Marca {
  Make_ID: number;
  Make_Name: string;
}

interface Modelo {
  Model_ID: number;
  Model_Name: string;
}

interface ListsState {
  marcas: Marca[];
  modelos: Modelo[];
  anios: string[];
}

interface SwitchProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const API_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles";

const CotizadorSeguros: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Inicializamos con tipos correctos para evitar el error 'never[]'
  const [lists, setLists] = useState<ListsState>({
    marcas: [],
    modelos: [],
    anios: [],
  });

  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    anio: "",
    version: "",
    tieneGNC: false,
    es0km: false,
    nombre: "",
    email: "",
    telefono: "",
  });

  // 1. Cargar marcas y años al montar el componente
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
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
          "NISSAN",
          "HYUNDAI",
        ];
        const filtered: Marca[] = data.Results.filter((m: any) =>
          populares.includes(m.Make_Name.toUpperCase())
        );
        setLists((prev) => ({ ...prev, marcas: filtered }));
      } catch (e) {
        console.error("Error cargando marcas", e);
      }
    };

    const currentYear = new Date().getFullYear() + 1; // Hasta 2026 si estamos en 2025
    const years: string[] = [];
    for (let i = currentYear; i >= 1990; i--) {
      years.push(i.toString());
    }
    setLists((prev) => ({ ...prev, anios: years }));

    fetchMarcas();
  }, []);

  // 2. Cargar modelos al seleccionar marca
  useEffect(() => {
    if (!formData.marca || formData.marca === "OTRA") return;

    const fetchModelos = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/GetModelsForMake/${formData.marca}?format=json`
        );
        const data = await res.json();
        setLists((prev) => ({ ...prev, modelos: data.Results }));
      } catch (e) {
        console.error("Error modelos", e);
      }
      setLoading(false);
    };
    fetchModelos();
  }, [formData.marca]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetAfter = (field: string) => {
    if (field === "marca") {
      setFormData((prev) => ({ ...prev, modelo: "", anio: "", version: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg">
        <header className="text-white mb-8 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Cotizador de seguros
          </h1>
          <p className="text-xl opacity-90">Tu auto protegido en pocos pasos</p>
        </header>
        puedes acer una paguina en la cual se puedan ver todos estos
        <div className="bg-white rounded-4xl shadow-2xl p-8">
          {step === 1 ? (
            <div className="space-y-4">
              <select
                name="marca"
                value={formData.marca}
                onChange={(e) => {
                  handleChange(e);
                  resetAfter("marca");
                }}
                className="w-full p-4 bg-gray-100 rounded-2xl appearance-none outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              >
                <option value="">Seleccione una marca</option>
                {lists.marcas.map((m) => (
                  <option key={m.Make_ID} value={m.Make_Name}>
                    {m.Make_Name}
                  </option>
                ))}
                <option value="OTRA">+ No encuentro mi marca</option>
              </select>

              <select
                name="modelo"
                disabled={!formData.marca || loading}
                value={formData.modelo}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 rounded-2xl appearance-none outline-none disabled:opacity-50 text-gray-700"
              >
                <option value="">
                  {loading ? "Cargando modelos..." : "Seleccione un modelo"}
                </option>
                {lists.modelos.map((m) => (
                  <option key={m.Model_ID} value={m.Model_Name}>
                    {m.Model_Name}
                  </option>
                ))}
              </select>

              <select
                name="anio"
                disabled={!formData.modelo}
                value={formData.anio}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 rounded-2xl appearance-none outline-none disabled:opacity-50 text-gray-700"
              >
                <option value="">Seleccione el año</option>
                {lists.anios.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="version"
                placeholder="Escriba la versión (ej: 1.6 Sigma, Full)"
                disabled={!formData.anio}
                value={formData.version}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />

              <div className="py-2 space-y-4">
                <Switch
                  label="¿Tiene GNC?"
                  name="tieneGNC"
                  checked={formData.tieneGNC}
                  onChange={handleChange}
                />
                <Switch
                  label="¿Es 0 km?"
                  name="es0km"
                  checked={formData.es0km}
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.version}
                className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition disabled:bg-gray-300 mt-4"
              >
                Siguiente
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Completa tus datos
              </h2>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre y Apellido"
                required
                className="w-full p-4 bg-gray-100 rounded-2xl outline-none"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                className="w-full p-4 bg-gray-100 rounded-2xl outline-none"
                onChange={handleChange}
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Número de celular"
                required
                className="w-full p-4 bg-gray-100 rounded-2xl outline-none"
                onChange={handleChange}
              />

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 py-4 rounded-full font-bold text-gray-600"
                >
                  Volver
                </button>
                <button
                  onClick={() =>
                    alert("¡Datos enviados! Un asesor te contactará.")
                  }
                  className="flex-2 bg-blue-600 text-white py-4 rounded-full font-bold"
                >
                  Finalizar Cotización
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Componente Switch con Tipado ---
const Switch: React.FC<SwitchProps> = ({ label, name, checked, onChange }) => (
  <label className="flex items-center justify-between cursor-pointer group">
    <span className="text-gray-600 font-medium">{label}</span>
    <div className="relative">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
    </div>
  </label>
);

export default CotizadorSeguros;
