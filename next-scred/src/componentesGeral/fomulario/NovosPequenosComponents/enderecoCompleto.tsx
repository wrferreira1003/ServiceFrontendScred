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
  cep:true,
  cidade: true,
  estado: true,
  bairro: true,
  numero: true,
  complemento: true,
  logradouro: true,
});

//Criando a typagem a partir do Schema de validação
export type CreateUserDataEnderecoCompleto = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserDataEnderecoCompleto) => void;
  formData: CreateUserDataEnderecoCompleto | undefined;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function EnderecoCompletoComponent({
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
  } = useForm<CreateUserDataEnderecoCompleto>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      cep:formData ? formData.cep: "",
      cidade: formData ? formData.cidade: "",
      estado: formData ? formData.estado: "",
      bairro: formData ?formData.bairro: "",
      numero: formData ?formData.numero: "",
      complemento: formData ?formData.complemento: "",
      logradouro: formData ?formData.logradouro: "",
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

  async function createUser(data: CreateUserDataEnderecoCompleto) {
    try {
      setMessage("Dados enviados com sucesso.");
      handleFormDataChange(data);
    } catch (erro) {
      console.error(erro);
      setMessage("Favor revisar os dados da solicitação");
    }
  }

  //funcao que tras as informacoes do Endereco na API Viacep
  const cep = watch('cep');
  useEffect(() => {
    if (cep && cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.data.erro) {
            setValue('logradouro', response.data.logradouro);
            setValue('bairro', response.data.bairro);
            setValue('complemento', response.data.complemento);
            setValue('estado', response.data.uf);
            setValue('cidade', response.data.localidade);

            // Continue para os outros campos...
          }
        })
      .catch (error => {
        
      })
        
    }
  }, [cep, setValue]);

  useEffect(() => {
    // Quando o componente renderizar, verifique se o user e userCliente estão definidos
    if (
      (user && user.user_type !== "Afiliado" || !user) && 
      userCliente && 
      userCliente.cpf) {
      // Se não for um afiliado, atualize o CPF para o CPF do usuário
    }
  }, [setValue, user, userCliente]);

 
  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(createUser)} action="">
        <h2
          className="mt-10 text-lg font-semibold
                       leading-7 text-gray-900"
        >
          Endereço Completo
        </h2>         
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    
          {/* CEP */}
          <div className="sm:col-span-3">
            <label
              htmlFor="cep"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              CEP: *
            </label>
            <div className="mt-2">
              <input
                type="cep"
                id="cep"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("cep")}
              />
            </div>
            {errors.cep && (
              <p className="mt-2 text-sm text-red-500">
                {errors.cep.message}
              </p>
            )}
          </div>

          {/* Logradouro */}
          <div className="sm:col-span-3">
            <label
              htmlFor="Logradouro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Logradouro: *:
            </label>
            <div className="mt-2">
              <input
                type="logradouro"
                id="logradouro"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("logradouro")}
              />
            </div>
            {errors.logradouro && (
              <p className="mt-2 text-sm text-red-500">
                {errors.logradouro.message}
              </p>
            )}
          </div>

          {/* Número */}
          <div className="sm:col-span-3">
            <label
              htmlFor="Logradouro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Número: *
            </label>
            <div className="mt-2">
              <input
                type="numero"
                id="numero"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("numero")}
              />
            </div>
            {errors.numero && (
              <p className="mt-2 text-sm text-red-500">
                {errors.numero.message}
              </p>
            )}
          </div>          

          {/* Complemento */}
          <div className="sm:col-span-3">
            <label
              htmlFor="Logradouro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Complemento:
            </label>
            <div className="mt-2">
              <input
                type="complemento"
                id="complemento"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("complemento")}
              />
            </div>
            {errors.complemento && (
              <p className="mt-2 text-sm text-red-500">
                {errors.complemento.message}
              </p>
            )}
          </div>  

          {/* Bairro */}
          <div className="sm:col-span-2">
            <label
              htmlFor="Logradouro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Bairro: *
            </label>
            <div className="mt-2">
              <input
                type="bairro"
                id="bairro"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("bairro")}
              />
            </div>
            {errors.bairro && (
              <p className="mt-2 text-sm text-red-500">
                {errors.bairro.message}
              </p>
            )}
          </div>  

          {/* Cidade */}
          <div className="sm:col-span-2">
            <label
              htmlFor="Logradouro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cidade: *
            </label>
            <div className="mt-2">
              <input
                type="cidade"
                id="cidade"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("cidade")}
              />
            </div>
            {errors.cidade && (
              <p className="mt-2 text-sm text-red-500">
                {errors.cidade.message}
              </p>
            )}
          </div>  

          {/* Estado */}
          <div className="sm:col-span-2">
            <label
              htmlFor="Logradouro"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Estado: *
            </label>
            <div className="mt-2">
              <input
                type="estado"
                id="estado"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("estado")}
              />
            </div>
            {errors.estado && (
              <p className="mt-2 text-sm text-red-500">
                {errors.estado.message}
              </p>
            )}
          </div>  
          
        </div>
      </form>
    </div>
  );
}