import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import UploadDocumentos from './uploadDocumentos'
import { createUserSchema } from '../../../../lib/validationSchemas'


const personaInfoSchema = createUserSchema.pick({
  rg: true,
  cpf: true,
  rgenvolvido: true,
  cpfenvolvido: true,
})

//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof personaInfoSchema>

interface FormularioEnderecoProps {
  handleFormDataChangeDocumentos: (data:CreateUserData) => void;
  formDataDocumentos : CreateUserData | null;
  setValidateAndSave: React.Dispatch<React.SetStateAction<(() => Promise<boolean>) | null>>;
}

export default function FormDocumentos({ formDataDocumentos,
                                         handleFormDataChangeDocumentos, 
                                         setValidateAndSave}:FormularioEnderecoProps ){
  
   const [message, setMessage] = useState('');                                          
  
  const { 
    handleSubmit,
    register, 
    formState: {errors}, 
    trigger,
    getValues,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personaInfoSchema),
    defaultValues:{
      rg: formDataDocumentos ? formDataDocumentos.rg : '',
      cpf: formDataDocumentos ? formDataDocumentos.cpf : '',
      rgenvolvido: formDataDocumentos ? formDataDocumentos.rgenvolvido : '',
      cpfenvolvido: formDataDocumentos ? formDataDocumentos.cpfenvolvido : '',
    }
  });

  const validateAndSave = async () => {
    console.log("A função validateAndSave foi chamada componente endereco.");
    const isValid = await trigger();
  
    // Valida os campos
    if (isValid) {
      handleFormDataChangeDocumentos(getValues()); // Se for válido, envia os valores para o componente pai
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    setValidateAndSave(() => validateAndSave);
  },[]);

  async function createUser(data: CreateUserData) {
    try{
      setMessage("Dados enviados com sucesso.")
      handleFormDataChangeDocumentos(data);
    } catch (erro){
      console.error(erro)
      setMessage('Favor revisar os dados da solicitação')
    }
  }


  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(createUser)} action="">  
        <h2 className="text-lg font-semibold leading-7
                       text-gray-900 mt-10">
          Dados do Solicitante
        </h2>
          {/* Campo de Identidade */}
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="rg" className="block text-sm font-medium leading-6 text-gray-900">
                    Identidade
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="rg"
                      placeholder='Digite seu RG'
                      className="block w-full rounded-md border-0 py-1.5 px-1
                      text-gray-900 shadow-sm ring-1 ring-inset 
                      ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                      focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('rg')}
                    />
                    {errors.rg && (
                      <p className="text-red-500 mt-2 text-sm">{errors.rg.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                    CPF
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="cpf"
                      className="block w-full rounded-md border-0 py-1.5 px-1
                                 text-gray-900 shadow-sm ring-1 ring-inset 
                                 ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('cpf')}
                      />
                      {errors.cpf && (
                      <p className="text-red-500 mt-2 text-sm">{errors.cpf.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-semibold leading-7
                       text-gray-900 mt-10">
          Dados do Envolvido no processo
        </h2>
          {/* Campo de Identidade */}
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="rgenvolvido" className="block text-sm font-medium leading-6 text-gray-900">
                    Identidade do Envolvido
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="rgenvolvido"
                      placeholder='Digite seu RG'
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('rgenvolvido')}
                    />
                    {errors.rgenvolvido && (
                      <p className="text-red-500 mt-2 text-sm">{errors.rgenvolvido.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="cpfenvolvido" className="block text-sm font-medium leading-6 text-gray-900">
                    CPF do Envolvido
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="cpfenvolvido"
                      className="block w-full rounded-md border-0 py-1.5 px-1
                                 text-gray-900 shadow-sm ring-1 ring-inset 
                                 ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('cpfenvolvido')}
                      />
                      {errors.cpfenvolvido && (
                      <p className="text-red-500 mt-2 text-sm">{errors.cpfenvolvido.message}</p>
                    )}
                  </div>
                </div>
              </div>
          
      </form>
    </div>
  )
}