import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../../lib/validationSchemas";

const personalSchema = createUserSchema.pick({
  cartorio: true,
  cidadeCartorio: true,
  estadoCartorio: true,
});

//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof personalSchema>;

interface FormularioCartorioProps {
  handleFormDataChangeCartorio: (data: CreateUserData) => void;
  formDataCartorio: CreateUserData | null;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function CartorioAutenticacao({
  handleFormDataChangeCartorio,
  formDataCartorio,
  setValidateAndSave,
}: FormularioCartorioProps) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      cartorio: formDataCartorio ? formDataCartorio.cartorio : "",
      cidadeCartorio: formDataCartorio ? formDataCartorio.cidadeCartorio : "",
      estadoCartorio: formDataCartorio ? formDataCartorio.estadoCartorio : "",
    },
  });

  const validateAndSave = async () => {
    const isValid = await trigger();

    // Valida os campos
    if (isValid) {
      handleFormDataChangeCartorio(getValues()); // Se for válido, envia os valores para o componente pai
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setValidateAndSave(() => validateAndSave);
    //eslint-disable-next-line
  }, []);
  return (
    <div className=" w-full">
      <form action="">
        <h2
          className="mt-10 text-lg font-semibold
                       leading-7 text-gray-900"
        >
          Dados do Cartório
        </h2>

        {/* Campo para  Digitar a folha e livro do processo solicitado */}

        {/* Campo Cartorio */}
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3 sm:col-start-1">
            <label
              htmlFor="cartorio"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cartório que tem firma reconhecida
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="cartorio"
                placeholder="Digite o Cartorio"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("cartorio")}
              />
              {errors.cartorio && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.cartorio.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="estadolivro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Estado do cartório
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="estadolivro"
                placeholder="Digite o Estado"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 focus:ring-indigo-600 first-letter:first-line:marker:selection:focus:ring-inset sm:text-sm sm:leading-6"
                {...register("estadoCartorio")}
              />
              {errors.estadoCartorio && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.estadoCartorio.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="livro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cidade do Cartório
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="livro"
                placeholder="Digite a Cidade"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 focus:ring-indigo-600 first-letter:first-line:marker:selection:focus:ring-inset sm:text-sm sm:leading-6"
                {...register("cidadeCartorio")}
              />
              {errors.cidadeCartorio && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.cidadeCartorio.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
