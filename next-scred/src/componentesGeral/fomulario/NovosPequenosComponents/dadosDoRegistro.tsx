import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/validationSchemas";


const personalSchema = createUserSchema.pick({
  livro: true,
  folha: true,
  termo: true,
});

//Criando a typagem a partir do Schema de validação
export type CreateUserDataDadosRegistro = zod.infer<typeof personalSchema>;

interface FormularioCartorioProps {
  handleFormDataDadosRegistro: (data: CreateUserDataDadosRegistro) => void;
  formDataDadosRegistro: CreateUserDataDadosRegistro | null;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function DadosDoRegistro({
  handleFormDataDadosRegistro,
  formDataDadosRegistro,
  setValidateAndSave,
}: FormularioCartorioProps) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<CreateUserDataDadosRegistro>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      livro: formDataDadosRegistro ? formDataDadosRegistro.livro : "",
      folha: formDataDadosRegistro ? formDataDadosRegistro.folha : "",
      termo: formDataDadosRegistro ? formDataDadosRegistro.termo : "",
    },
  });

  const validateAndSave = async () => {
    const isValid = await trigger();

    // Valida os campos
    if (isValid) {
      handleFormDataDadosRegistro(getValues()); // Se for válido, envia os valores para o componente pai
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
          Dados do Registro
        </h2>

        {/* Campo para  Digitar a folha e livro do processo solicitado */}

        {/* Campo Cartorio */}
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          
          <div className="sm:col-span-2">
            <label
              htmlFor="livro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Livro
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="livro"
                placeholder="Digite o livro"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 focus:ring-indigo-600 first-letter:first-line:marker:selection:focus:ring-inset sm:text-sm sm:leading-6"
                {...register("livro")}
              />
              {errors.livro && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.livro.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="folha"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Folha
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="folha"
                placeholder="Digite a folha"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 focus:ring-indigo-600 first-letter:first-line:marker:selection:focus:ring-inset sm:text-sm sm:leading-6"
                {...register("folha")}
              />
              {errors.folha && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.folha.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="termo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Termo
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="termo"
             
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 focus:ring-indigo-600 first-letter:first-line:marker:selection:focus:ring-inset sm:text-sm sm:leading-6"
                {...register("termo")}
              />
              {errors.termo && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.termo.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}