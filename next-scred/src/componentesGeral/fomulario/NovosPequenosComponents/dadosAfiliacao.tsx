import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/validationSchemas";

const personalInfoSchema = createUserSchema.pick({
  filiacao1: true,
  filiacao2: true,
});

//Criando a typagem a partir do Schema de validação
export type CreateUserDataAfiliacao = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserDataAfiliacao) => void;
  formData: CreateUserDataAfiliacao | undefined;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function DadosAfiliacao({
  formData,
  handleFormDataChange, //Funcao que recebe os dados
  setValidateAndSave,
}: FormularioSolicitacaoProps) {

  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<CreateUserDataAfiliacao>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      filiacao1: formData ? formData.filiacao1 : "",
      filiacao2: formData ? formData.filiacao2 : "",
      //Colocar os valores default para cada campo.
    },
  });

  const validateAndSave = async () => {
    console.log("A função validateAndSave foi chamada componente endereco.");
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
    setValidateAndSave(() => validateAndSave);
    //eslint-disable-next-line
  }, []);

  async function createUser(data: CreateUserDataAfiliacao) {
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
        <div>
          <h2
            className="mt-10 text-lg font-semibold
                        leading-7 text-gray-900"
          >
            Dados Filiação
          </h2>
         
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          {/* Campo Filiacao 1 */}
          <div className="sm:col-span-3">
            <label
              htmlFor="filiacao1"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Filiação 1
            </label>
            <div className="mt-2">
              <input
                id="filiacao1"
                type="filiacao1"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("filiacao1")}
              />
            </div>
            {errors.filiacao1 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.filiacao1.message}
              </p>
            )}
          </div>

          {/* filiacao2 */}
          <div className="sm:col-span-3">
            <label
              htmlFor="filiacao2"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Filiação 2
            </label>
            <div className="mt-2">
              <input
                type="filiacao2"
                id="filiacao2"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("filiacao2")}
              />
            </div>
            {errors.filiacao2 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.filiacao2.message}
              </p>
            )}
          </div>
  
        </div>
      </form>
    </div>
  );
}