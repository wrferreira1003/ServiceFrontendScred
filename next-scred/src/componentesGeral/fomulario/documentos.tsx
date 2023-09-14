import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../../lib/validationSchemas";
import { AuthUserContext } from "@/context/AuthUserContext";

const personaInfoSchema = createUserSchema.pick({
  rg: true,
  cpf: true,
  rgenvolvido: true,
  cpfenvolvido: true,
});

//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof personaInfoSchema>;

interface FormularioEnderecoProps {
  handleFormDataChangeDocumentos: (data: CreateUserData) => void;
  formDataDocumentos: CreateUserData | null;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function FormDocumentos({
  formDataDocumentos,
  handleFormDataChangeDocumentos,
  setValidateAndSave,
}: FormularioEnderecoProps) {
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personaInfoSchema),
    defaultValues: {
      rg: formDataDocumentos ? formDataDocumentos.rg : "",
      cpf: formDataDocumentos ? formDataDocumentos.cpf : "",
      rgenvolvido: formDataDocumentos ? formDataDocumentos.rgenvolvido : "",
      cpfenvolvido: formDataDocumentos ? formDataDocumentos.cpfenvolvido : "",
    },
  });

  const {userCliente} = useContext(AuthUserContext)

  useEffect(() => {
    if (userCliente){
      setValue('cpf', userCliente.cpf || '');
    }
  }, [userCliente, setValue]);

  const validateAndSave = async () => {
    const isValid = await trigger();

    // Valida os campos
    if (isValid) {
      handleFormDataChangeDocumentos(getValues()); // Se for válido, envia os valores para o componente pai
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    setValidateAndSave(() => validateAndSave);
    //eslint-disable-next-line
  }, []);

  async function createUser(data: CreateUserData) {
    try {
      setMessage("Dados enviados com sucesso.");
      handleFormDataChangeDocumentos(data);
    } catch (erro) {
      console.error(erro);
      setMessage("Favor revisar os dados da solicitação");
    }
  }

  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(createUser)} action="">
        <h2
          className="mt-10 text-lg font-semibold
                       leading-7 text-gray-900"
        >
          Dados do Solicitante
        </h2>
        {/* Campo de Identidade */}
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="rg"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Identidade
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="rg"
                placeholder="Digite seu RG"
                className="block w-full rounded-md border-0 px-1 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset 
                      ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                      focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("rg")}
              />
              {errors.rg && (
                <p className="mt-2 text-sm text-red-500">{errors.rg.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="cpf"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              CPF
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="cpf"
                className="block w-full rounded-md border-0 px-1 py-1.5
                                 text-gray-900 shadow-sm ring-1 ring-inset 
                                 ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("cpf")}
              />
              {errors.cpf && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.cpf.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <h2
          className="mt-10 text-lg font-semibold
                       leading-7 text-gray-900"
        >
          Dados do Envolvido no processo
        </h2>
        {/* Campo de Identidade */}
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="rgenvolvido"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Identidade do Envolvido
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="rgenvolvido"
                placeholder="Digite seu RG"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("rgenvolvido")}
              />
              {errors.rgenvolvido && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.rgenvolvido.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="cpfenvolvido"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              CPF do Envolvido
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="cpfenvolvido"
                className="block w-full rounded-md border-0 px-1 py-1.5
                                 text-gray-900 shadow-sm ring-1 ring-inset 
                                 ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("cpfenvolvido")}
              />
              {errors.cpfenvolvido && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.cpfenvolvido.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
