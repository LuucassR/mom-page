import logo from "../images/logo.jpeg";

export default function NavBar() {
  return (
    <div className="bg-[#151747] shadow-xl">
      <div className="flex items-center justify-center w-full p-2">
        <img src={logo} alt="Logo" className="object-contain size-16" />
      </div>
    </div>
  );
}