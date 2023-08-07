import { useForm, FormProvider, Controller } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserSchema } from '../../../../lib/validationSchemas'
import { useEffect, useState } from 'react'

const personalInfoSchema = createUserSchema.pick({
  cidadeafiliado: true,
  afiliado: true,
})

type CreateUserData = zod.infer<typeof personalInfoSchema>

interface FormularioAfiliadosProps{
  handleFormDataChangeAfiliados: (data:CreateUserData) => void,
  setValidateAndSave: React.Dispatch<React.SetStateAction<(() => Promise<boolean>) | null>>,
  formDataAfiliados: CreateUserData
}

export default function Afiliados({ handleFormDataChangeAfiliados,
                                    setValidateAndSave,
                                    formDataAfiliados}:FormularioAfiliadosProps){
  const [message, setMessage] = useState(''); 
  const { 
    handleSubmit,
    register, 
    formState: {errors}, 
    getValues,
    trigger,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues:{
      //Colocar os valores default para cada campo.
      cidadeafiliado: formDataAfiliados ? formDataAfiliados.cidadeafiliado: '',
      afiliado: formDataAfiliados ? formDataAfiliados.afiliado: '',
    }
  });

  const validateAndSave = async () => {
    console.log("A função validateAndSave foi chamada componente endereco.");
    const isValid = await trigger();
  
    // Valida os campos
    if (isValid) {
      handleFormDataChangeAfiliados(getValues()); // Se for válido, envia os valores para o componente pai
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setValidateAndSave(() => validateAndSave);
  //eslint-disable-next-line
  },[]);

  async function createUser(data: CreateUserData) {
    try{
      setMessage("Dados enviados com sucesso.")
      handleFormDataChangeAfiliados(data);
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
          Dados do Afiliado para acompanhamento do processo
        </h2>
      {/* Afiliados */}
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="cidade-afiliado" className="block text-sm font-medium leading-6 text-gray-900">
                    Cidade
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      id="cidade-afiliado"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('cidadeafiliado')}
                      >
                        <option>Selecione uma cidade</option>
                        <option>Rio de Janeiro</option>
                        <option>Nitéroi</option>
                        <option>Marica</option>
                      </select>
                      {errors.cidadeafiliado && (
                      <p className="text-red-500 mt-2 text-sm">{errors.cidadeafiliado.message}</p>
                    )}
                    </div>
                  </div>
      

                <div className="sm:col-span-2">
                  <label htmlFor="afiliado" className="block text-sm font-medium leading-6 text-gray-900">
                    Afiliado
                  </label>
                  <div className="mt-2">
                    <select
                      id="afiliado"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('afiliado')}
                      >
                        <option>Selecione um afiliado</option>
                        <option>047 - Rio de Janeiro</option>
                        <option>048 - Nitéroi</option>
                        <option>049 - Marica</option>
                      </select>
                      {errors.afiliado && (
                      <p className="text-red-500 mt-2 text-sm">{errors.afiliado.message}</p>
                    )}
                  </div>
                  
                </div>
              </div>
      </form>

    </div>
  )
}