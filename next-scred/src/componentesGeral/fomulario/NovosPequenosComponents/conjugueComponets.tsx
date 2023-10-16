import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthUserContext } from "@/context/AuthUserContext";
import { apipublic } from "@/services/apipublic";
import { AuthContext } from "@/context/AuthContext";
import { createUserSchema } from "@/lib/validationSchemas";

const personalInfoSchema = createUserSchema.pick({
  conjugue1: true,
  conjugue2: true,
});

//Criando a typagem a partir do Schema de validação
export type CreateUserDataConjugue = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserDataConjugue) => void;
  formData: CreateUserDataConjugue | undefined;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function DadosConjugueCasamento({
  formData,
  handleFormDataChange, //Funcao que recebe os dados
  setValidateAndSave,
}: FormularioSolicitacaoProps) {

  const {userCliente} = useContext(AuthUserContext)
  const {user} = useContext(AuthContext)
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    trigger,
    setValue,
    watch
  } = useForm<CreateUserDataConjugue>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      conjugue1: formData ? formData.conjugue1: "",
      conjugue2: formData ? formData.conjugue2: "",
  
      //Colocar os valores default para cada campo.
    },
  });

  const validateAndSave = async () => {
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

  async function createUser(data: CreateUserDataConjugue) {
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
      <h2
          className="mt-10 text-lg font-semibold
                       leading-7 text-gray-900"
        >
          Dados dos cônjuges
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Campo Conjugue 1 */}
          <div className="sm:col-span-3">
            <label
              htmlFor="conjugue1"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome do primeiro cônjuges
            </label>
            <div className="mt-2">
              <input
                id="conjugue1"
                type="conjugue1"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("conjugue1")}
              />
            </div>
            {errors.conjugue1 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.conjugue1.message}
              </p>
            )}
          </div>

          {/* Campo Conjugue 2 */}
          <div className="sm:col-span-3">
            <label
              htmlFor="conjugue2"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome do segundo cônjuges
            </label>
            <div className="mt-2">
              <input
                type="conjugue2"
                id="conjugue2"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("conjugue2")}
              />
            </div>
            {errors.conjugue2 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.conjugue2.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}