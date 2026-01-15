import NavBar from "./components/NavBar";
import Add from "./components/add";
import Secure from "./components/secures";
import Contact from "./components/Contact";
import Client from "./components/client";
import { useState } from "react";
import car from "./images/car.png"
import "./App.css"

export default function App() {
  const [adImage, setAdImage] = useState<string | null>(null);
  const [adType, setAdType] = useState<string | null>(null);

  return (
    <div className="bg-[#e3e3e3] min-h-screen w-screen">
      <NavBar />

      {(!adType && !adImage) ? <Add type={"Auto"} image={car} /> : adType && adImage && <Add type={adType} image={adImage} />}

      <Secure
        onSelect={(type: string, image: string) => {
          setAdType(type);
          setAdImage(image);
        }}
      />

      <Contact />
      <Client />
    </div>
  );
}
