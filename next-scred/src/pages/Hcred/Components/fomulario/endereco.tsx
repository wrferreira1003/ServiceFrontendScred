import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../../../../lib/validationSchemas";

const personalInfoSchema = createUserSchema.pick({
  estado: true,
  endereco: true,
  cidade: true,
  bairro: true,
  cep: true,
});
//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChangeEndereco: (data: CreateUserData) => void;
  formDataendereco: CreateUserData | null;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function EnderecoForm({
  formDataendereco,
  handleFormDataChangeEndereco, //Funcao que recebe os dados
  setValidateAndSave,
}: FormularioSolicitacaoProps) {
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    control,
    getValues,
    trigger,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      estado: formDataendereco ? formDataendereco.estado : "",
      endereco: formDataendereco ? formDataendereco.endereco : "",
      cidade: formDataendereco ? formDataendereco.cidade : "",
      bairro: formDataendereco ? formDataendereco.bairro : "",
      cep: formDataendereco ? formDataendereco.cep : "",
      //Colocar os valores default para cada campo.
    },
  });

  const validateAndSave = async () => {
    console.log("A função validateAndSave foi chamada componente endereco.");
    const isValid = await trigger();

    // Valida os campos
    if (isValid) {
      handleFormDataChangeEndereco(getValues()); // Se for válido, envia os valores para o componente pai
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
      handleFormDataChangeEndereco(data);
    } catch (erro) {
      console.error(erro);
      setMessage("Favor revisar os dados da solicitação");
    }
  }
  return (
    <div className=" w-full">
      <form /*onSubmit={handleSubmit(createUser)}*/ action="">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Campo Endereço */}
          <div className="col-span-full">
            <label
              htmlFor="endereco"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Endereço (Rua, Quadra, Lote ou Número)
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="endereco"
                placeholder="Rua x, Lote ou Número: x, Quadra: Y, Complemento"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                           ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("endereco")}
              />
              {errors.endereco && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.endereco.message}
                </p>
              )}
            </div>
          </div>

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

          {/* Campo Bairro */}
          <div className="sm:col-span-3">
            <label
              htmlFor="bairro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Bairro
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="bairro"
                placeholder="Digite seu bairro"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("bairro")}
              />
              {errors.bairro && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.bairro.message}
                </p>
              )}
            </div>
          </div>

          {/* Campo CEP */}
          <div className="sm:col-span-3">
            <label
              htmlFor="cep"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cep
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="cep"
                placeholder="00000-00"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2   
                          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("cep")}
              />
              {errors.cep && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.cep.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
