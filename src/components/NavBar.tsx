import "./components.css";

export default function NavBar() {
  return (
    <div className="bg-white shadow-xl shadow-black/4 w-screen">
      <style>
      </style>
      <div className="flex w-screen">
        <svg
          className="size-10 self-center cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>menu</title>
          <path d="M3,8V7H20V8H3M20,12V13H3V12H20M3,17H20V18H3V17Z" />
        </svg>
      </div>
    </div>
  );
}