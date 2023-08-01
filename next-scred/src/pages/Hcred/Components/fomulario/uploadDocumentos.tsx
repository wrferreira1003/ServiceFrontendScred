import { PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

//Realizar as validacoes dos dados aqui.
const createUserSchema = zod.object({
  fileUpload: zod.any(), // Todo: Criar as validacoes necessaria para os arquivos upload.
});

//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof createUserSchema>

interface FormularioEnderecoProps {
  handleFormDataChangeUpload: (data:CreateUserData) => void;
  formDataupload : CreateUserData | null;
  setValidateAndSave: React.Dispatch<React.SetStateAction<(() => Promise<boolean>) | null>>;
}

export default function UploadDocumentos(){
  
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
      
    }
  });

  const validateAndSave = async () => {
    console.log("A função validateAndSave foi chamada componente endereco.");
    const isValid = await trigger();
  
    // Valida os campos
    if (isValid) {
      //handleFormDataChangeDocumentos(getValues()); // Se for válido, envia os valores para o componente pai
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    //setValidateAndSave(() => validateAndSave);
  }, []);

  async function createUser(data: CreateUserData) {
    try{
      setMessage("Dados enviados com sucesso.")
    } catch (erro){
      console.error(erro)
      setMessage('Favor revisar os dados da solicitação')
    }
  }

  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(createUser)} action="">  
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