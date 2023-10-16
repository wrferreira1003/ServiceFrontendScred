import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthUserContext } from "@/context/AuthUserContext";
import { createUserSchema } from "@/lib/validationSchemas";
import { EstadosList } from "@/types/Estados";

const personalInfoSchema = createUserSchema.pick({
  estado: true,
  cidade: true,
});
//Criando a typagem a partir do Schema de validação
export type CreateUserDataCidade = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserDataCidade) => void;
  formDataCidade: CreateUserDataCidade | null;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function EstadoCidadeComponet({
  formDataCidade,
  handleFormDataChange, //Funcao que recebe os dados
  setValidateAndSave,
}: FormularioSolicitacaoProps) {
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useForm<CreateUserDataCidade>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      estado: formDataCidade ? formDataCidade.estado : "",
      cidade: formDataCidade ? formDataCidade.cidade : "",

      //Colocar os valores default para cada campo.
    },
  });
  const {userCliente} = useContext(AuthUserContext)

  useEffect(() => {
    if (userCliente){
      setValue('estado', userCliente.estado || '');
      setValue('cidade', userCliente.cidade || '');

    }
  }, [userCliente, setValue]);

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
  
  async function createUser(data: CreateUserDataCidade) {
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
      <form /*onSubmit={handleSubmit(createUser)}*/ action="">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Campo Estado */}
          <div className="sm:col-span-3">
            <label
              htmlFor="estado"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Estado
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="estado"
                placeholder="Digite seu Estado"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("estado")}
              />
              {errors.estado && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.estado.message}
                </p>
              )}
            </div>
          </div>

          {/* Campo Cidade */}
          <div className="sm:col-span-3">
            <label
              htmlFor="cidade"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cidade
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="cidade"
                placeholder="Digite a sua Cidade"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("cidade")}
              />
              {errors.cidade && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.cidade.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}