import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthUserContext } from "@/context/AuthUserContext";
import axios from "axios";
import { apipublic } from "@/services/apipublic";
import { AuthContext } from "@/context/AuthContext";
import { createUserSchema } from "@/lib/validationSchemas";

const personalInfoSchema = createUserSchema.pick({
  nome: true,
  email: true,
  cpf: true,
  telefone: true,
});

//Criando a typagem a partir do Schema de validação
export type CreateUserDataSolicitante = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserDataSolicitante) => void;
  formData: CreateUserDataSolicitante | undefined;
  setValidateAndSaveSolicitante: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function DadosSolicitanteComponents({
  formData,
  handleFormDataChange, //Funcao que recebe os dados
  setValidateAndSaveSolicitante,
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
  } = useForm<CreateUserDataSolicitante>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      nome: formData ? formData.nome : "",
      email: formData ? formData.email : "",
      cpf: formData ? formData.cpf : "",
      telefone: formData ? formData.telefone : "",
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
    setValidateAndSaveSolicitante(() => validateAndSave);
    //eslint-disable-next-line
  }, []);

  async function createUser(data: CreateUserDataSolicitante) {
    try {
      setMessage("Dados enviados com sucesso.");
      handleFormDataChange(data);
    } catch (erro) {
      console.error(erro);
      setMessage("Favor revisar os dados da solicitação");
    }
  }

  useEffect(() => {
    // Quando o componente renderizar, verifique se o user e userCliente estão definidos
    if (
      (user && user.user_type !== "Afiliado" || !user) && 
      userCliente && 
      userCliente.cpf) {
      // Se não for um afiliado, atualize o CPF para o CPF do usuário
      setValue('cpf', userCliente.cpf);
    }
  }, [setValue, user, userCliente]);


  const cpf = watch('cpf');
  useEffect(() => {
    if (cpf && cpf.length === 11) {
      apipublic.get(`listcpf/${cpf}/`)
      .then(response => {
      if (!response.data.erro) {
        setValue('nome', response.data.nome);
        setValue('email', response.data.email);
        setValue('telefone', response.data.telefone);
        // Continue para os outros campos...
      }
    })
    .catch (error => {
        
        })
    }
  }, [cpf, setValue]);

 
  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(createUser)} action="">
        <h2
          className="mt-5 text-lg font-semibold
                       leading-7 text-gray-900"
        >
          Dados do Solicitante
        </h2>
        
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          {/* Campo cpf */}
          <div className="sm:col-span-3">
            <label
              htmlFor="cpf"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              CPF
            </label>
            <div className="mt-2">
              <input
                disabled={user?.user_type !== "AFILIADO"}
                id="cpf"
                type="cpf"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("cpf")}
              />
            </div>
            {errors.cpf && (
              <p className="mt-2 text-sm text-red-500">
                {errors.cpf.message}
              </p>
            )}
          </div>


          {/* Campo Nome */}
          <div className="sm:col-span-3">
            <label
              htmlFor="nome"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome Completo
            </label>
            <div className="mt-2">
              <input
                disabled={user?.user_type !== "AFILIADO"}
                type="text"
                id="nome"
                className="block w-full rounded-md border-0 px-1 py-1.5
                           text-gray-900 shadow-sm ring-1 ring-inset 
                           ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("nome")}
              />
            </div>
            {errors.nome && (
              <p className="mt-2 text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>

          {/* Campo Email */}
          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                disabled={user?.user_type !== "AFILIADO"}
                type="text"
                id="email"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
       
          {/* Telefone */}
          <div className="sm:col-span-3">
            <label
              htmlFor="telefone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Telefone: *
            </label>
            <div className="mt-2">
              <input
                type="telefone"
                id="telefone"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("telefone")}
              />
            </div>
            {errors.telefone && (
              <p className="mt-2 text-sm text-red-500">
                {errors.telefone.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}