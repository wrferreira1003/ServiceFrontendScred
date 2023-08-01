import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserSchema } from '../../../../lib/validationSchemas'


//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof createUserSchema>

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserData) => void;
  formData: CreateUserData | null;
  setValidateAndSave: React.Dispatch<React.SetStateAction<(() => Promise<boolean>) | null>>;
}

export default function DadosPessoas({formData,
                                      handleFormDataChange, //Funcao que recebe os dados
                                      setValidateAndSave}:FormularioSolicitacaoProps ){
  const [message, setMessage] = useState('');

  const { 
    handleSubmit,
    register, 
    formState: {errors}, 
    watch,
    control,
    getValues,
    trigger,
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
    defaultValues:{
      nome: formData ? formData.nome : '',
      sobrenome: formData ? formData.sobrenome : '',
      email: formData ? formData.email: '',
      telefone: formData ? formData.telefone: '',
      nomeenvolvido: formData ? formData.nomeenvolvido: '',
      sobrenomeenvolvido: formData ? formData.sobrenomeenvolvido: '',
      //Colocar os valores default para cada campo.
    }
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
  }, []);

  async function createUser(data: CreateUserData) {
    try{
      setMessage("Dados enviados com sucesso.")
      handleFormDataChange(data);
    } catch (erro){
      console.error(erro)
      setMessage('Favor revisar os dados da solicitação')
    }
  }

  return(
    <div className=" w-full">
      <form onSubmit={handleSubmit(createUser)} action="">  
        <h2 className="text-lg font-semibold leading-7
                       text-gray-900 mt-10">
          Dados do Solicitante
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        

          {/* Campo Nome */}
          <div className="sm:col-span-3">
            <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
              Primeiro Nome
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="nome"
                placeholder='Digite seu nome'
                className="block w-full rounded-md border-0 py-1.5 px-1
                           text-gray-900 shadow-sm ring-1 ring-inset 
                           ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('nome')}
              />
              
            </div>
            {errors.nome && (
                    <p className="text-red-500 mt-2 text-sm">{errors.nome.message}</p>
                  )}
          </div>
          
          {/* Campo Sobrenome */}
          <div className="sm:col-span-3">
            <label htmlFor="sobrenome" className="block text-sm font-medium leading-6 text-gray-900">
              Sobrenome
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="sobrenome"
                placeholder='Digite seu sobrenome'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-1
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('sobrenome')}
              />
              
            </div>
            {errors.sobrenome && (
                    <p className="text-red-500 mt-2 text-sm">{errors.sobrenome.message}</p>
                  )}
          </div>
          
          {/* Campo email */}
          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                placeholder='Digite seu email'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('email')}
              />
              
            </div>
            {errors.email && (
                    <p className="text-red-500 mt-2 text-sm">{errors.email.message}</p>
                  )}
          </div>

          {/* Campo Telefone */}
          <div className="sm:col-span-3">
            <label htmlFor="telefone" className="block text-sm font-medium leading-6 text-gray-900">
              Telefone
            </label>
            <div className="mt-2">
              <input
                id="telefone"
                type="telefone"
                placeholder='(XX) XXXXX-XXXX'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('telefone')}
              />
              
            </div>
            {errors.telefone && (
                    <p className="text-red-500 mt-2 text-sm">{errors.telefone.message}</p>
                  )}
          </div>
          </div>

          <h2 className="text-lg font-semibold leading-7
                       text-gray-900 mt-10">
          Dados do Envolvido no processo
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        

          {/* Campo Nome */}
          <div className="sm:col-span-3">
            <label htmlFor="nomeenvolvido" className="block text-sm font-medium leading-6 text-gray-900">
              Primeiro Nome
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="nomeenvolvido"
                placeholder='Digite seu nome'
                className="block w-full rounded-md border-0 py-1.5 px-1
                           text-gray-900 shadow-sm ring-1 ring-inset 
                           ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('nomeenvolvido')}
              />
              
            </div>
            {errors.nomeenvolvido && (
                    <p className="text-red-500 mt-2 text-sm">{errors.nomeenvolvido.message}</p>
                  )}
          </div>
          
          {/* Campo Sobrenome */}
          <div className="sm:col-span-3">
            <label htmlFor="sobrenomeenvolvido" className="block text-sm font-medium leading-6 text-gray-900">
              Sobrenome
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="sobrenomeenvolvido"
                placeholder='Digite seu sobrenome'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-1
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('sobrenomeenvolvido')}
              />
              
            </div>
            {errors.sobrenomeenvolvido && (
                    <p className="text-red-500 mt-2 text-sm">{errors.sobrenomeenvolvido.message}</p>
                  )}
          </div>       
          </div>
      
    
      </form>
    </div>
    )
  }

