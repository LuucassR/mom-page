import "./components.css";

interface AdProps {
  type: string;
  image: string;
}

import "./components.css"

interface AdProps {
  type: string;
  image: string;
}

export default function Add({ type, image }: AdProps) {
  return (
    <div className="w-full bg-linear-to-br from-[#151747] to-[#2a2e85] rounded-3xl shadow-2xl overflow-hidden relative border border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
        
        {/* Lado Izquierdo: Texto y Botón */}
        <div className="flex-1 text-center md:text-left z-10 space-y-6">
          <div>
            <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight">
              Tu <span className="text-sky-400">tranquilidad</span>,<br /> nuestra prioridad.
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mt-4 opacity-90">
              Cotizá tu seguro de <span className="font-bold text-white underline decoration-sky-400 decoration-2 transition-all">{type}</span> con un asesor experto.
            </p>
          </div>

          <div className="flex justify-center md:justify-start">
            <a 
              href="https://wa.me/3424483534" 
              target="_blank" 
              rel="noreferrer"
              className="group bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all shadow-lg hover:shadow-green-500/40 hover:-translate-y-1 active:scale-95"
            >
              <WhatsAppIcon />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Lado Derecho: Imagen con efecto */}
        <div className="flex-1 flex justify-center items-center z-10">
          <div className="relative">
            {/* Brillo de fondo para la imagen */}
            <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-full"></div>
            <img 
              src={image} 
              alt={type} 
              className="w-48 md:w-72 lg:w-80 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] transform group-hover:rotate-2 transition-transform duration-500" 
            />
          </div>
        </div>

        {/* Decoración abstracta de fondo */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

// Icono de WhatsApp pequeño para reusar
function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.538-2.961-2.654-.087-.116-.708-.941-.708-1.794 0-.853.448-1.273.607-1.446.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298L10.75 10.2c.043.101.072.217.006.347-.067.13-.1.21-.199.324l-.15.15c-.08.077-.164.162-.07.326.094.164.415.686.891 1.111.612.547 1.127.718 1.286.797.159.08.253.066.347-.043.094-.11.405-.47.513-.63.108-.159.217-.13.361-.077.144.053.911.43 1.067.509.156.08.259.12.296.183.037.062.037.359-.108.764zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 1.8a8.2 8.2 0 1 0 0 16.4 8.2 8.2 0 0 0 0-16.4z"/>
    </svg>
  );
}
