import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserSchema = zod.object({
  cartorio: zod.string().nonempty('Informar o nome do Cartório'),
  estadolivro: zod.string().nonempty('Informar o Estado do Registro'),
  livro: zod.string().nonempty('Informar o número do livro'),
  folha: zod.string().nonempty('Informar o número da folha'),
})

//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof createUserSchema>

interface FormularioCartorioProps {
  handleFormDataChangeCartorio: (data:CreateUserData) => void;
  formDataCartorio : CreateUserData | null;
  setValidateAndSave: React.Dispatch<React.SetStateAction<(() => Promise<boolean>) | null>>;
}


export default function DadosCartorio({handleFormDataChangeCartorio,
                                      formDataCartorio,
                                      setValidateAndSave}: FormularioCartorioProps){
  const { 
    handleSubmit,
    register, 
    formState: {errors}, 
    trigger,
    getValues,
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
    defaultValues:{
      cartorio: formDataCartorio ? formDataCartorio.cartorio: '',
      estadolivro: formDataCartorio ? formDataCartorio.estadolivro: '',
      livro: formDataCartorio ? formDataCartorio.livro: '',
      folha: formDataCartorio ? formDataCartorio.folha: '',

    }
  });

  const validateAndSave = async () => {
    const isValid = await trigger();
  
  // Valida os campos
  if (isValid) {
    handleFormDataChangeCartorio(getValues()); // Se for válido, envia os valores para o componente pai
    return true;
  } else {
    return false;
  }};
  
  useEffect(() => {
    setValidateAndSave(() => validateAndSave);
  }, []);
  return(
    <div className=" w-full">
      <form action="">
        <h2 className="text-lg font-semibold leading-7
                       text-gray-900 mt-10">
          Dados do Cartório para consulta
        </h2>

        {/* Campo para  Digitar a folha e livro do processo solicitado */}
      
            {/* Campo Cartorio */}
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3 sm:col-start-1">
                  <label htmlFor="cartorio" className="block text-sm font-medium leading-6 text-gray-900">
                    Cartorio
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="cartorio"
                      placeholder='Digite o Cartorio'
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('cartorio')}
                    />
                    {errors.cartorio && (
                      <p className="text-red-500 mt-2 text-sm">{errors.cartorio.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="estadolivro" className="block text-sm font-medium leading-6 text-gray-900">
                    Estado
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="estadolivro"
                      placeholder='Digite o Estado'
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('estadolivro')}
                      />
                      {errors.estadolivro && (
                      <p className="text-red-500 mt-2 text-sm">{errors.estadolivro.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="livro" className="block text-sm font-medium leading-6 text-gray-900">
                    Livro
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="livro"
                      placeholder='Digite o livro'
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('livro')}
                      />
                      {errors.livro && (
                      <p className="text-red-500 mt-2 text-sm">{errors.livro.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="folha" className="block text-sm font-medium leading-6 text-gray-900">
                    Folha
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="folha"
                      placeholder='Digite a folha'
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('folha')}
                      />
                      {errors.folha && (
                      <p className="text-red-500 mt-2 text-sm">{errors.folha.message}</p>
                    )}
                  </div>
                </div>
                </div>

      </form>
    </div>
  )
}