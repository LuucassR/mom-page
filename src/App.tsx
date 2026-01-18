import NavBar from "./components/NavBar";
import Add from "./components/add";
import Secure from "./components/secures";
import Client from "./components/client";
import { useState } from "react";
import car from "./images/car.png"
import "./App.css"

export default function App() {
  const [adImage, setAdImage] = useState<string | null>(null);
  const [adType, setAdType] = useState<string | null>(null);

  // Definimos el tipo actual, por defecto "Auto" si no hay nada seleccionado
  const currentType = adType || "Auto";
  const currentImage = adImage || car;

  return (
    <div className="bg-slate-100 min-h-screen w-full pb-32">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4">
        <section className="py-8">
          <Add type={currentType} image={currentImage} />
        </section>

        <section className="py-8">
          <Secure
            onSelect={(type, image) => {
              setAdType(type);
              setAdImage(image);
            }}
          />
        </section>
      </main>

      {/* Pasamos el tipo al footer flotante */}
      <Client selectedType={adType || "Auto"} />
    </div>
  );
}
