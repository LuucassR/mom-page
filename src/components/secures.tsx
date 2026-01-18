import motorbike from "../images/motorbike.png";
import Car from "../images/car.png"
import bicycle from "../images/bycicle.png"
import house from "../images/house.png"
import life from "../images/life-insurance.png"
import art from "../images/injuries.png"
import store from "../images/store.png"
import delivery from "../images/delivery.png"
import "./components.css"

export const SECURES = [
  {
    type: "Auto",
    image: Car,
  },
  {
    type: "Moto",
    image: motorbike,
  },
  {
    type: "Bicicleta",
    image: bicycle,
  },
  {
    type: "Transporte",
    image: delivery,
  },
  {
    type: "Hogar",
    image: house,
  },
  {
    type: "Vida",
    image: life,
  },
  {
    type: "ART",
    image: art,
  },
  {
    type: "Comercio",
    image: store,
  },
];




interface SecureProps {
  onSelect: (type: string, image: string) => void;
}

function SecureCard({ type, image }: { type: string; image: string }) {
  return (
    <div className="bg-white hover:bg-blue-500 transition rounded-2xl cursor-pointer">
      <img src={image} alt={type} className="h-24 mx-auto mb-2" />
      <p className="text-center font-semibold">
        Cotizar seguro {type}
      </p>
    </div>
  );
}

export default function Secure({ onSelect }: SecureProps) {
  return (
    <div className="mt-10">
      <h2 className="text-center mb-10 text-3xl font-bold text-slate-800">
        ¿Qué seguros tenemos para vos?
      </h2>

      {/* Grid responsivo: 2 col en movil, 3 en tablet, 4 en desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {SECURES.map((secure) => (
          <button
            key={secure.type}
            onClick={() => onSelect(secure.type, secure.image!)}
            className="group transition-transform hover:-translate-y-2"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm group-hover:shadow-xl group-hover:bg-blue-600 transition-all duration-300 border border-slate-200">
              <img src={secure.image} alt={secure.type} className="h-20 mx-auto mb-4 object-contain" />
              <p className="text-center font-bold text-slate-700 group-hover:text-white">
                Seguro de {secure.type}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
