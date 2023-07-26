import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

//Realizar as validacoes dos dados aqui.
const createUserSchema = zod.object({
  nome: zod.string().nonempty({
    message: 'O Nome é obrigatório',
  }).min(3,{
    message: 'O Nome precisa ter no mínimo 3 caracteres'
  }),

  sobrenome: zod.string().nonempty({
    message: 'O Sobrenome é obrigatório',
  }).min(3,{
    message: 'O Sobrenome precisa ter no mínimo 3 caracteres'
  }),

  email: zod.string().nonempty({
    message: 'O Email é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  }),
  telefone: zod.string().refine(value => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(value);
  }, {
    message:'Número de telefone inválido, o formato correto é (XX) XXXXX-XXXX',
  }),
});

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
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

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
      
    
      </form>
    </div>
    )
  }

