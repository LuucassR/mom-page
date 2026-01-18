import { useNavigate } from "react-router";

export default function Client({ selectedType }: { selectedType: string }) {
  const navigate = useNavigate();
  const isAuto = selectedType === "Auto";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-slate-200 p-4 z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-center md:text-left">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Estado del trámite</p>
          <p className="text-slate-800 font-medium">
            {isAuto 
              ? "✅ Sistema de cotización online listo" 
              : `⏳ Cotización de ${selectedType} vía asesor (WhatsApp)`}
          </p>
        </div>

        <button
          onClick={() => isAuto && navigate("/cotizacion")}
          disabled={!isAuto}
          className={`w-full md:w-auto px-10 py-3 rounded-xl font-bold transition-all duration-300 ${
            isAuto 
              ? "bg-[#151747] text-white hover:bg-blue-900 shadow-lg shadow-blue-900/20 active:scale-95" 
              : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
          }`}
        >
          {isAuto ? "Comenzar Cotización Online" : "Solo disponible por WhatsApp"}
        </button>
      </div>
    </div>
  );
}