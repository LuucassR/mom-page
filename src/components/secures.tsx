import "./components.css";
import motorbike from "../images/motorbike.png";
import Car from "../images/car.png"
import bicycle from "../images/bycicle.png"
import house from "../images/house.png"
import life from "../images/life-insurance.png"
import art from "../images/injuries.png"
import store from "../images/store.png"
import delivery from "../images/delivery.png"

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
    type: "Trandssporte",
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
    <div className="bg-white hover:bg-blue-500 transition rounded-2xl p-4 cursor-pointer">
      <img src={image} alt={type} className="h-24 mx-auto mb-2" />
      <p className="text-center font-semibold">
        Cotizar seguro {type}
      </p>
    </div>
  );
}

export default function Secure({ onSelect }: SecureProps) {
  return (
    <div>
      <h2 className="text-center mb-10 text-3xl mt-10">
        ¿Qué seguros tenemos?
      </h2>

      <div className="grid m-5 gap-5 grid-cols-2">
        {SECURES.map((secure) => (
          <button
            key={secure.type}
            onClick={() => onSelect(secure.type, secure.image!)}
          >
            <SecureCard
              type={secure.type}
              image={secure.image}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
