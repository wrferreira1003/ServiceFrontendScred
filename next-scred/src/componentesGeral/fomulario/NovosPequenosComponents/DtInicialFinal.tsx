import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/validationSchemas";


const personalInfoSchema = createUserSchema.pick({
  Dtinicial: true,
  Dtfinal: true,
});

//Criando a typagem a partir do Schema de validação
export type CreateUserDataInicialFinal = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserDataInicialFinal) => void;
  formData: CreateUserDataInicialFinal | undefined;
  setValidateAndSaveDtInicialFinal: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function DataInicialFinal({
  formData,
  handleFormDataChange, //Funcao que recebe os dados
  setValidateAndSaveDtInicialFinal,
}: FormularioSolicitacaoProps) {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    trigger,
    setValue,
    watch
  } = useForm<CreateUserDataInicialFinal>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      Dtinicial: formData ? formData.Dtinicial : "",
      Dtfinal: formData ? formData.Dtfinal : "",
      //Colocar os valores default para cada campo.
    },
  });

  const validateAndSave = async () => {
    console.log("A função validateAndSave foi chamada componente endereco.");
    
    const data = getValues();
    if (new Date(data.Dtfinal) <= new Date(data.Dtinicial)) {
      setErrorMessage("A data final deve ser após a data inicial");
      return false;
    } else {
      setErrorMessage(null); // limpar qualquer mensagem de erro anterior
    }
    
    const isValid = await trigger();

    // Valida os campos
    if (isValid) {
      handleFormDataChange(getValues()); // Se for válido, envia os valores para o componente pai
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setValidateAndSaveDtInicialFinal(() => validateAndSave);
    //eslint-disable-next-line
  }, []);

  async function createUser(data: CreateUserDataInicialFinal) {
    try {
      setMessage("Dados enviados com sucesso.");
      handleFormDataChange(data);
    } catch (erro) {
      console.error(erro);
      setMessage("Favor revisar os dados da solicitação");
    }
  }
 
  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(createUser)} action="">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Data de Inicial */}
          <div className="sm:col-span-3">
            <label
              htmlFor="dtinicial"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Data Inicial
            </label>
            <div className="mt-2">
              <input
                type="date"
                id="Dtinicial"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("Dtinicial")}
              />
            </div>
            {errors.Dtinicial && (
              <p className="mt-2 text-sm text-red-500">
                {errors.Dtinicial.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="dtfinal"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Data Final
            </label>
            <div className="mt-2">
              <input
                type="date"
                id="Dtfinal"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("Dtfinal")}
              />
            </div>
            {errors.Dtfinal && (
              <p className="mt-2 text-sm text-red-500">
                {errors.Dtfinal.message}
              </p>
              
            )}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          </div>
        </div>
      </form>
    </div>
  );
}