import LoadingComponent from "@/componentesGeral/ReactLoading";
import UploadStatus from "@/componentesGeral/UploadStatus";
import { createUserSchema } from "@/lib/validationSchemas";
import { api } from "@/services/api";
import { getApiClient } from "@/services/apiservidor";
import { InfoDataType } from "@/types/Adm/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";


const personalSchema = createUserSchema.pick({
  nome: true,
  email: true,
  telefone: true,
  endereco: true,
  cidade: true,
  bairro: true,
  estado: true,
  cep: true,
  cpfUsuario: true,
  user_type: true,
});

//Typagem para o zood a partir das validacoes ja existente na pasta lib
export type CreateUserData = zod.infer<typeof personalSchema>;

type TypeProps = {
  userId : number | null
  setOpenModal: (value: boolean) => void;
};

export default function FormularioSigup({userId, setOpenModal }:TypeProps) {

  const [dataInfo, setDataInfo] = useState<InfoDataType | null >(null)
  const [uploadStatus, setUploadStatus] = useState(''); // null, 'success', 'error'
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
    },
  });

  useEffect(() => {
    async function fetchAfiliado() {
      try {
        const response = await api.get(`afiliado/${userId}`);
        setDataInfo(response.data);
        
        // Atualize os valores do formulário aqui
        setValue('nome', response.data.nome);
        setValue('email', response.data.email);
        setValue('telefone', response.data.telefone);
        setValue('endereco', response.data.endereco);
        setValue('bairro', response.data.bairro);
        setValue('cidade', response.data.cidade);
        setValue('estado', response.data.estado);
        setValue('cep', response.data.cep);
        setValue('user_type', response.data.user_type);
        setValue('cpfUsuario', response.data.cnpj);
        // Faça o mesmo para os outros campos, conforme necessário.
      } catch (error) {
        console.error("Erro ao buscar dados do afiliado:", error);
      }
    }
    if (userId){
      fetchAfiliado()
    }
  }, [userId, setValue]);

  const onSubmitData = async (data: CreateUserData) => {
    const { cpfUsuario, ...resrOfData} = data
    const transformeData = {
      ...resrOfData,
      cnpj: data.cpfUsuario,
    }
    // Adicione um estado de loading aqui, se você tiver um.    
      try {
      const response = await api.patch(`afiliado/${userId}`, transformeData);
          
      alert('Seus dados foram enviados e processados com sucesso.')
    } catch (error) {
      setUploadStatus('error');

    } finally {
      setOpenModal(false) //Fecha a modal
    }
  
  };


  
  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
     
      <div className="space-y-12">
        <div className="border-gray-900/10 pb-5">
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
                <select
                  {...register("user_type", {
                    required: "Selecione uma função."
                  })}
                  id="user_type"
                  name="user_type"
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                              text-gray-900 shadow-sm ring-1 ring-inset 
                              ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled >Selecione uma função</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="AFILIADO">AFILIADO</option>
                </select>
                {errors.user_type && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.user_type.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="cpfcpfUsuario"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CPF/CNPJ
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
//Aqui estou fazendo verificaoes pelo lado do servidor next se existe o token
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);

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
