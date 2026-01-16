import "./components.css"

interface SideBarProps {
  show: boolean;
  toggle: () => void;
}

export default function SideBar({ show, toggle }: SideBarProps) {
  return (
    <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${show ? 'visible opacity-100' : 'hidden opacity-0'}`}>
      <div className={`h-screen bg-white w-3/4 relative transition-transform duration-300 ${show ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={toggle} className="p-4">
          <svg className="size-10 fill-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Cerrar menú</title>
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
        <h1 className="p-4 text-2xl font-bold">Menú</h1>
      </div>
    </div>
  );
}