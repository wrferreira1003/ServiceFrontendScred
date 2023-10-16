import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/validationSchemas";

const personalInfoSchema = createUserSchema.pick({
  temFilhosMenores: true,
  temBens: true,
  filhoIncapaz: true,
});

//Criando a typagem a partir do Schema de validação
export type CreateUserDataDovorcio = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserDataDovorcio) => void;
  formData: CreateUserDataDovorcio | undefined;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function DivorcioComponets({
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
  } = useForm<CreateUserDataDovorcio>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      temFilhosMenores: formData ? formData.temFilhosMenores : "",
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

  async function createUser(data: CreateUserDataDovorcio) {
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
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Tem Filhos de Menores Sim ou Não */}
          <div className="sm:col-span-1">
            <label
              htmlFor="nascimento"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tem Filhos de Menores?
            </label>
            <div className="mt-2">
            <select
                id="temFilhosMenores"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Não"
                {...register("temFilhosMenores")}
                >
                <option>Sim</option>
                <option>Não</option>
            </select>
            </div>
          </div>
        

          {/* Tem Bens a Partilhar */}
          <div className="sm:col-span-1">
            <label
              htmlFor="temBens"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tem Bens a Partilhar?
            </label>
            <div className="mt-2">
            <select
                id="temBens"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Não"
                {...register("temBens")}
                >
                <option>Sim</option>
                <option>Não</option>
            </select>
            </div>
          </div>
        
          {/* Tem Bens a Partilhar */}
          <div className="sm:col-span-1">
            <label
              htmlFor="temBens"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tem Filho Incapaz?
            </label>
            <div className="mt-2">
            <select
                id="filhoIncapaz"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Não"
                {...register("filhoIncapaz")}
                >
                <option>Sim</option>
                <option>Não</option>
            </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}