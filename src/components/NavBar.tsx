import logo from "../images/logo.jpeg";
import "./components.css"

export default function NavBar() {
  return (
    <nav className="bg-[#151747] sticky top-0 z-50 border-b border-blue-900/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <span className="text-white font-bold text-xl tracking-tight hidden sm:block">SV Seguros</span>
        </div>
        
        {/* En escritorio puedes agregar links o un botón de contacto */}
        <div className="hidden md:flex gap-6 text-blue-100 font-medium">
        </div>
      </div>
    </nav>
  );
}