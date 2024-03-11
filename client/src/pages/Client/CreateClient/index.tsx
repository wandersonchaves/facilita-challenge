import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const newClientFormValidationSchema = z.object({
  name: z.string().min(1, "Informe o nome"),
  email: z.string().email("Informe um email válido"),
  phone: z.string().min(8, "O telefone precisa ter no mínimo 8 caracteres"),
  coordinate_x: z
    .number()
    .min(-90, "A coordenada X deve estar entre -90 e 90")
    .max(90, "A coordenada X deve estar entre -90 e 90"),
  coordinate_y: z
    .number()
    .min(-180, "A coordenada X deve estar entre -180 e 180")
    .max(180, "A coordenada X deve estar entre -180 e 180"),
});

type NewClientFormData = z.infer<typeof newClientFormValidationSchema>;

export function CreateClient() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewClientFormData>({
    resolver: zodResolver(newClientFormValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      coordinate_x: 0,
      coordinate_y: 0,
    },
  });

  async function handleCreateNewClient(data: NewClientFormData) {
    try {
      const response = await fetch("http://localhost:3000/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para a API");
      }

      reset();
      navigate("/");
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    }
  }

  return (
    <form
      className="bg-gray-900 p-4"
      onSubmit={handleSubmit(handleCreateNewClient)}
    >
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nome:
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
            {...register("name")}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Telefone:
          </label>
          <input
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="123-45-678"
            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            required
            {...register("phone")}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          required
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="coordX"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Coordenada X:
          </label>
          <input
            type="number"
            id="coordX"
            step="any"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="-90 to 90"
            required
            {...register("coordinate_x", { valueAsNumber: true })}
          />
          {errors.coordinate_x && <span>{errors.coordinate_x.message}</span>}
        </div>
        <div>
          <label
            htmlFor="coordY"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Coordenada Y:
          </label>
          <input
            type="number"
            id="coordY"
            step="any"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="-180 to 180"
            required
            {...register("coordinate_y", { valueAsNumber: true })}
          />
          {errors.coordinate_y && <span>{errors.coordinate_y.message}</span>}
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
