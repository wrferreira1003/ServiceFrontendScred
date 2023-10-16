import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/validationSchemas";

const personalInfoSchema = createUserSchema.pick({
  DtObito: true,
  nome_falecido:true,
});

//Criando a typagem a partir do Schema de validação
export type CreateUserDataDtObito = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserDataDtObito) => void;
  formData: CreateUserDataDtObito | undefined;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function DataObitoComponent({
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
  } = useForm<CreateUserDataDtObito>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      DtObito: formData ? formData.DtObito : "",
      nome_falecido: formData ? formData.nome_falecido : "",
      //Colocar os valores default para cada campo.
    },
  });

  const validateAndSave = async () => {
    console.log("A função validateAndSave foi chamada componente DtObito.");
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

  async function createUser(data: CreateUserDataDtObito) {
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
          Dados do falecido
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Data do Óbito */}
          <div className="sm:col-span-3">
            <label
              htmlFor="DtObito"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Data do óbito
            </label>
            <div className="mt-2">
              <input
                type="date"
                id="DtObito"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("DtObito")}
              />
            </div>
            {errors.DtObito && (
              <p className="mt-2 text-sm text-red-500">
                {errors.DtObito.message}
              </p>
            )}
          </div>

          {/* Campo Nome */}
          <div className="sm:col-span-3">
            <label
              htmlFor="nome"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome do falecido
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="nome_falecido"
                className="block w-full rounded-md border-0 px-1 py-1.5
                           text-gray-900 shadow-sm ring-1 ring-inset 
                           ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("nome_falecido")}
              />
            </div>
            {errors.nome_falecido && (
              <p className="mt-2 text-sm text-red-500">{errors.nome_falecido.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}