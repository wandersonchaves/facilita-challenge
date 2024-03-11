import logoFacilita from "../../assets/logo-facilita.png";
import { NavLink, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between px-4 py-3 text-gray-400 rounded-t-lg sm:flex sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <img src={logoFacilita} alt="Logo" className="w-24 h-auto" />

      <nav className="flex gap-2">
        <NavLink
          to="/client"
          title="Clientes"
          className={`w-24 h-12 flex items-center justify-center ${
            location.pathname === "/client" ? "border-b-2 border-green-500" : ""
          }`}
        >
          Clientes
        </NavLink>
        <NavLink
          to="/improved-route"
          title="Criar novo cliente"
          className={`w-24 h-12 flex items-center justify-center ${
            location.pathname === "/improved-route"
              ? "border-b-2 border-green-500"
              : ""
          }`}
        >
          Rota otimizada
        </NavLink>
      </nav>
    </header>
  );
}
