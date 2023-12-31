import { createUserSchema } from "@/lib/validationSchemas";
import { InfoDataType } from "@/types/Adm/types";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as zod from "zod";

interface ChildComponentProps {
  infoData: InfoDataType;
  onUpdateData: (data: CreateUserData, id: number) => void;
}

const personalSchema = createUserSchema.pick({
  nome: true,
  email: true,
  telefone: true,
  endereco: true,
  cidade: true,
  bairro: true,
  estado: true,
  cep: true,
  cpf: true,
  user_type: true,
});

//Typagem para o zood a partir das validacoes ja existente na pasta lib
export type CreateUserData = zod.infer<typeof personalSchema>;

export default function AdmAccount({
  infoData,
  onUpdateData,
}: ChildComponentProps) {
  const {
    id,
    nome,
    email,
    telefone,
    endereco,
    cidade,
    estado,
    cep,
    user_type,
    cnpj,
    bairro,
  } = infoData || {};

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      nome: nome,
      email: email,
      telefone: telefone,
      endereco: endereco,
      cidade: cidade,
      estado: estado,
      cep: cep,
      user_type: user_type,
      cpf: cnpj,
      bairro: bairro,
    },
  });

  const onSubmitData = async (data: CreateUserData) => {
    if (onUpdateData) {
      onUpdateData(data, id);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      <div className="space-y-12">
        <div className="border-gray-900/10 pb-5">
          <div className="mb-6 mt-8 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
             Informações Pessoal
           </h2>

          <Link
              href={'/adm/request'}
              type="button"
              className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 
                  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-indigo-600"
              >
                <ArrowLongLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  Voltar
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="nome"
                className="block text-sm font-medium 
                                                    leading-6 text-gray-900"
              >
                Nome Completo
              </label>
              <div className="mt-2">
                <input
                  {...register("nome")}
                  type="text"
                  name="nome"
                  id="nome"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                            focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.nome && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.nome.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6
                                                text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                              text-gray-900 shadow-sm ring-1 ring-inset
                              ring-gray-300 
                              placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                              focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefone
              </label>
              <div className="mt-2">
                <input
                  {...register("telefone")}
                  id="telefone"
                  name="telefone"
                  type="number"
                  autoComplete="telefone"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset
                          ring-gray-300 placeholder:text-gray-400 focus:ring-2
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.telefone && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.telefone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label
                htmlFor="endereco"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Endereço
              </label>
              <div className="mt-">
                <input
                  {...register("endereco")}
                  type="text"
                  name="endereco"
                  id="endereco"
                  autoComplete="endereco"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.endereco && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.endereco.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="bairro"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bairro
              </label>
              <div className="mt-2">
                <input
                  {...register("bairro")}
                  type="bairro"
                  name="bairro"
                  id="bairro"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.bairro && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.bairro.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="cidade"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cidade
              </label>
              <div className="mt-2">
                <input
                  {...register("cidade")}
                  type="cidade"
                  name="cidade"
                  id="cidade"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.cidade && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.cidade.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="estado"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Estado
              </label>
              <div className="mt-2">
                <input
                  {...register("estado")}
                  type="text"
                  name="estado"
                  id="estado"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.estado && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.estado.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="cep"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cep
              </label>
              <div className="mt-2">
                <input
                  {...register("cep")}
                  type="text"
                  name="cep"
                  id="cep"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.cep && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.cep.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="user_type"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Função
              </label>
              <div className="mt-2">
                <input
                  {...register("user_type")}
                  type="text"
                  name="user_type"
                  id="user_type"
                  disabled
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                              text-gray-900 shadow-sm ring-1 ring-inset 
                              ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.user_type && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.user_type.message}
                  </p>
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
                  {...register("cpf")}
                  type="text"
                  name="cpf"
                  id="cpf"
                  autoComplete="cpf"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                              text-gray-900 shadow-sm ring-1 ring-inset 
                              ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.cpf && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.cpf.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>       
      </div>
    
      <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold 
                  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2 
                  focus-visible:outline-indigo-600"
        >
          Atualizar Informações
      </button>

    </form>
  );
}
