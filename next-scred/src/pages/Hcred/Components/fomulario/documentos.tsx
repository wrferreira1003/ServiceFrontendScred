import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

//Realizar as validacoes dos dados aqui.
const createUserSchema = zod.object({
  rg: zod.string().nonempty({
    message: 'O RG é obrigatório',
  }),
  
  cpf: zod
    .string()
    .nonempty('CPF não pode ser vazio')
    .refine(
      cpf => cpf.length === 11,
    {message: 'CPF precisa ter apenas números'}
  ),

  rgenvolvido: zod.string().nonempty({
    message: 'O RG é obrigatório',
  }),
  
  cpfenvolvido: zod
    .string()
    .nonempty('CPF não pode ser vazio')
    .refine(
      cpf => cpf.length === 11,
    {message: 'CPF precisa ter apenas números'}
  ),

  fileUpload: zod.any(), // Todo: Criar as validacoes necessaria para os arquivos upload.
});

//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof createUserSchema>

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
    resolver: zodResolver(createUserSchema),
    defaultValues:{
      rg: formDataDocumentos ? formDataDocumentos.rg : '',
      cpf: formDataDocumentos ? formDataDocumentos.cpf : '',
      rgenvolvido: formDataDocumentos ? formDataDocumentos.rgenvolvido : '',
      cpfenvolvido: formDataDocumentos ? formDataDocumentos.cpfenvolvido : '',
      fileUpload: formDataDocumentos ? formDataDocumentos.fileUpload : '',
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
  }, []);

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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset
                                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('cpfenvolvido')}
                      />
                      {errors.cpfenvolvido && (
                      <p className="text-red-500 mt-2 text-sm">{errors.cpfenvolvido.message}</p>
                    )}
                  </div>
                </div>
              </div>
            
            {/* Campo de upload */}
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 mt-10">
              Documentação : Anexar documentos como RG, CPF ou CNH, comprovante de endereço de todas as partes envolvidas no processo.
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 
                              focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 
                              focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Enviar Documentos</span>
                    <input 
                      id="file-upload" 
                      multiple
                      type="file" 
                      className="sr-only" 
                      {...register('fileUpload')}
                    />
                  </label>
                  <p className="pl-1">Carregar um arquivo ou arraste e solte</p>
                </div>
                  <p className="text-xs leading-5 text-gray-600">PDF, PNG, JPG, GIF up to 25MB</p>
              </div>          
            </div>
      </form>
    </div>
  )
}