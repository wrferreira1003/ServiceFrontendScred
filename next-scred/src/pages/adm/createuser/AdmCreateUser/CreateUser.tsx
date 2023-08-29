import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { createUserSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { handleApiErrors } from "@/lib/RetornoApi";
import Router from "next/router";


const personalSchema = createUserSchema.pick({
  nome: true,
  email: true,
  telefone: true,
  endereco: true,
  cidade: true,
  estado: true,
  cep: true,
  cpfUsuario: true,
  user_type: true,
  bairro: true,
  razao_social: true,
});

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  estado: string;
  endereco: string;
  cidade: string;
  bairro: string;
  cep: string;
  user_type: string;
  cpfUsuario?: string;  // Aqui o "?" indica que é opcional
  cnpj?: string;        // Incluímos cnpj como opcional também
  razao_social: string;
};


//Typagem para o zood a partir das validacoes ja existente na pasta lib
export type CreateUserData = zod.infer<typeof personalSchema>;

export default function CreateUserComponents() {

  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personalSchema),
  });

  //Funcao para criar o Afiliado/Usuario
  const CreateUser = async (data: any) => {
    try {
        const response = await api.post('todos_afiliados', data);
        toast.success('Usuário Criado com Sucesso!')
        // Redirecionar para a página desejada após a criação do usuário
        Router.push('/adm/signup');

      } catch (err) {
        console.error('Erro ao criar o usuário:', err);
        const errorMessage = handleApiErrors(err)
        toast.error(errorMessage); 
  }
}

  const onSubmitData = async (data: CreateUserData) => {
    const { cpfUsuario, ...resrOfData} = data
    const transformeData = {
      ...resrOfData,
      cnpj: data.cpfUsuario,
    }
    //Carrego no estado para manipular
    setFormData(transformeData)

    //Chamos a funcao que criar os dados.
    CreateUser(transformeData)

  }
  
  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="space-y-12">
          <div className="border-gray-900/10 pb-5">
          <div className="mb-6 mt-8 flex items-start justify-between">
        <h1>Cadastro de Usuário</h1>
        <Link
          href={'/adm/signup'}
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 
                  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-indigo-600"
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
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

              <div className="col-span-full">
                <label
                  htmlFor="razao_social"
                  className="block text-sm font-medium 
                                                      leading-6 text-gray-900"
                >
                  Razão_Social
                </label>
                <div className="mt-2">
                  <input
                    {...register("razao_social")}
                    type="text"
                    name="razao_social"
                    id="razao_social"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 
                              text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                              placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                              focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.razao_social && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.razao_social.message}
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

              <div className="sm:col-span-3">
                <label
                  htmlFor="endereco"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Endereço
                </label>
                <div className="mt-2">
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
                  htmlFor="cpfUsuario"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  CNPJ/CPF
                </label>
                <div className="mt-2">
                  <input
                    {...register("cpfUsuario")}
                    type="text"
                    name="cpfUsuario"
                    id="cpfUsuario"
                    autoComplete="cpfUsuario"
                    className="block w-full rounded-md border-0 px-2 py-1.5 
                                text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.cpfUsuario && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.cpfUsuario.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>       
        </div>
      
        <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold mt-5 
                    text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                    focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-indigo-600"
          >
            Cadastrar
        </button>
      </div>
    </form>
  )
}

//Aqui estou fazendo verificaoes pelo lado do servidor next se existe o token
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { ["tokenAfiliado"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {

    },
  };
};