import { useEffect, useState } from "react";
import { AddButton } from "../../components/AddButton";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  coordinate_x: number;
  coordinate_y: number;
}

export function Client() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch("http://localhost:3000/clients");
        const { clients } = await response.json();
        setClients(clients);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    }

    fetchClients();
  }, []);

  // Função para filtrar os clientes com base no termo de busca
  const filteredClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
    );
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg -mt-1">
      <div className="py-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative px-2">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar por nome, email ou telefone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Telefone
            </th>
            <th scope="col" className="px-6 py-3">
              Coordenadas
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr
              key={client.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {client.name}
              </th>
              <td className="px-6 py-4">{client.email}</td>
              <td className="px-6 py-4">{client.phone}</td>
              <td className="px-6 py-4">
                {client.coordinate_x}
                <span className="text-green-300"> / </span>
                {client.coordinate_y}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddButton redirectTo="create" />
    </div>
  );
}
