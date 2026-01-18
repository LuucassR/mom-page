import React, { useState, useEffect } from "react";
import "./components.css";

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCotizaciones = async () => {
    try {
      const response = await fetch("/getCotizaciones", {
        credentials: "include",
      });
      const result = await response.json();
      console.log(response)
      setData(result);
    } catch (error) {
      console.error("Error cargando cotizaciones:", error);
    }
  };

  // Validar sesión al cargar el componente
  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch("/admin/validate-session", {
          credentials: "include",
        });
        if (response.ok) {
          setIsLoggedIn(true);
          fetchCotizaciones();
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error validando sesión:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    validateSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCotizaciones();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: user, password: pass }),
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setUser("");
        setPass("");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al intentar iniciar sesión");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  const handleMarcarCompletada = async (cotizacionId: number) => {
    try {
      await fetch(`/cotizacion/${cotizacionId}/marcar-completada`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      fetchCotizaciones();
    } catch (error) {
      console.error("Error marcando como completada:", error);
    }
  };

  const handleEliminar = async (cotizacionId: number, userId: number) => {
    if (window.confirm("¿Está seguro que desea eliminar esta cotización y el usuario?")) {
      try {
        await fetch(`/cotizacion/${cotizacionId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
          credentials: "include",
        });
        fetchCotizaciones();
      } catch (error) {
        console.error("Error eliminando cotización:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-gray-600 text-lg">Validando sesión...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Admin Login
          </h2>
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            className="w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            className="w-full p-3 mb-6 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Ingresar
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">Sesión durará 24 horas</p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Panel de Cotizaciones
          </h1>
          <button
            onClick={handleLogout}
            className="text-red-500 font-semibold hover:underline"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="p-4 font-semibold">Fecha</th>
                  <th className="p-4 font-semibold">Cliente</th>
                  <th className="p-4 font-semibold">Contacto</th>
                  <th className="p-4 font-semibold">Vehículo</th>
                  <th className="p-4 font-semibold">Seguro</th>
                  <th className="p-4 font-semibold">Detalles</th>
                  <th className="p-4 font-semibold">Estado</th>
                  <th className="p-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-400">
                      No hay cotizaciones registradas aún.
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-blue-50 transition-colors ${item.cotizacion?.completada ? 'bg-green-50' : ''}`}
                    >
                      {/* Fecha: Prisma usa createdAt */}
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4 font-medium text-gray-800">
                        {item.nombre}
                      </td>

                      <td className="p-4">
                        <div className="text-sm">{item.email}</div>
                        <div className="text-xs text-blue-600 font-bold">
                          {item.telefono}
                        </div>
                      </td>

                      {/* Accedemos a la relación cotizacion */}
                      <td className="p-4">
                        <span className="font-bold text-gray-700">
                          {item.cotizacion?.marca || "N/A"}
                        </span>{" "}
                        {item.cotizacion?.modelo || ""}
                        <div className="text-xs text-gray-500">
                          {item.cotizacion?.anio} - {item.cotizacion?.version}
                        </div>
                      </td>

                      {/* Tipo de Seguro */}
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                          {item.cotizacion?.tipoSeguro || "N/A"}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          {item.cotizacion?.tieneGNC && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] rounded-full font-bold uppercase">
                              GNC
                            </span>
                          )}
                          {item.cotizacion?.es0km && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text[10px] rounded-full font-bold uppercase">
                              0km
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Estado */}
                      <td className="p-4">
                        {item.cotizacion?.completada ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold uppercase">
                            ✓ Hecho
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-bold uppercase">
                            Pendiente
                          </span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="p-4">
                        <div className="flex gap-2">
                          {!item.cotizacion?.completada && (
                            <button
                              onClick={() => handleMarcarCompletada(item.cotizacion.id)}
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition font-semibold"
                              title="Marcar como completada"
                            >
                              ✓ Hecho
                            </button>
                          )}
                          <button
                            onClick={() => handleEliminar(item.cotizacion.id, item.id)}
                            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition font-semibold"
                            title="Eliminar cotización"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
