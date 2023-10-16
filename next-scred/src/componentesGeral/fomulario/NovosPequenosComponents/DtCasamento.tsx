import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/validationSchemas";
import { CreateUserDataDtNascimento } from "./DtNascimento";

const personalInfoSchema = createUserSchema.pick({
  DtCasamento: true,
});

//Criando a typagem a partir do Schema de validação
export type CreateUserDataDtCasamento = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserDataDtCasamento) => void;
  formData: CreateUserDataDtCasamento | undefined;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function DataCasamentoComponent({
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
    setValue,
    watch
  } = useForm<CreateUserDataDtCasamento>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      DtCasamento: formData ? formData.DtCasamento : "",
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

  async function createUser(data: CreateUserDataDtCasamento) {
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
          {/* Data de Casamento */}
          <div className="sm:col-span-3">
            <label
              htmlFor="nascimento"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Data do Casamento
            </label>
            <div className="mt-2">
              <input
                type="date"
                id="DtCasamento"
                placeholder="Digite sua Profissáo"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("DtCasamento")}
              />
            </div>
            {errors.DtCasamento && (
              <p className="mt-2 text-sm text-red-500">
                {errors.DtCasamento.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}