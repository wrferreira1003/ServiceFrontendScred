import { InfoDataTypeRequests } from "@/types/Adm/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileData } from '../../../servicosOnline/atanotarial/components/NovoServicoGeral';
import Link from "next/link";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadDocumentos from "@/componentesGeral/fomulario/uploadDocumentos/uploadDocumentos";
import { apipublic } from "@/services/apipublic";
import { toast } from "react-toastify";
import LoadingComponent from "@/componentesGeral/ReactLoading";

interface DynamicFormProps {
  processData: InfoDataTypeRequests[];
  processId: number | null;
}
export interface FormularioDocumentos {
  fileUpload: any;
}
interface FormValues {
  [key: string]: any; 
}
type DocumentoType = {
  arquivo: Blob | File;
  descricao: string;
};

export default function DynamicFormUser({processData, processId}:DynamicFormProps){
  const [fileState, setFileState] = useState<FileData[]>([]);
  const [initialState, setInitialState] = useState<FormValues>({});
  const [isLoading, setIsLoading] = useState(false);

  let dynamicValidationSchema: any = {};
  
  const propriedadesExcluidas = ['id', 'idCliente','Registro Cliente','Data do Pedido','Status do Processo'];
  const propriedadesExcluidasAfiliado = ['id','telefone'];
  
  const keywordMapping: { [key: string]: string } = {
    "RG":"RegistroGeral",
    "RG do Envolvido":"RegistroGeralEnvolvido",
    "Bairrro":"bairro",
    "CEP":"cep",
    "Cidade":"cidade",
    "CPF":"cpf",
    "CPF do Envolvido":"cpfEnvolvido",
    "Data de Nascimento":"data_nascimento",
    "Email":"email",
    "Endereço": "endereco",
    "Estado":"estado",
    "Estado do Cartorio com Firma":"estadoCartorio",
    "estado do Cartorio com Firma":"estadoCartorioFirmaReconhecida",
    "Estado Civil": "estado_civil",
    "Livro do Cartorio com Firma":"livroCartorioFirmaReconhecida",
    "Nome":"nome",
    "Nome do Cartorio com Firma":"nomeCartorioFirmaReconhecida",
    
    "Nome do Envolvido":"nomeEnvolvido",
    "Profissao":"profissao",
    "Serviço Solicitado":"servico",
    "Sobrenome":"sobrenome",
    "Sobrenome do Envolvido":"sobrenomeEnvolvido",
    "Telefone":"telefone"
  };


//Funcao que trata os uploads
const handleFilesChange = (files: any) => {
  const newFilesArray: FileData[] = Object.values(files);
  setFileState((prevDataUpload) => {
    const uniqueFiles = [...prevDataUpload];
    newFilesArray.forEach((newFile) => {
      if (!prevDataUpload.some((prevFile) => prevFile.id === newFile.id)) {
        uniqueFiles.push(newFile);
      }
    });
    return uniqueFiles;
    
    });
  };

  //Funcao para Remover um arquivo
  const removeFile = (indexToRemove: number) => {
    setFileState((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(indexToRemove, 1);
      return updatedFiles;
    });
  };

  if (processData && typeof processData === "object") {
    Object.entries(processData).forEach(([key, value]) => {
      if (!propriedadesExcluidas.includes(key)) {
        // Adicione validação para esse campo, por exemplo:
        
      }
    });
  }

  const validationSchema = z.object(dynamicValidationSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues
  } = useForm({
    resolver: zodResolver(validationSchema)
  });

  // Quando o componente monta, os dados do formulario são obtidos
  useEffect(() => {
    setInitialState(getValues());
}, [getValues]);



  const onSubmitForm = () => {
    const currentValues = getValues() as FormValues;
    const changedValues: any = {};
    Object.keys(currentValues).forEach(key => {
      if (currentValues[key] !== initialState[key]) {
          changedValues[key] = currentValues[key];
      }
  });
    updateDataOnServer(changedValues)
  };

  //Funcao que ajusta os nomes dos campos
  function prepareDataForServer(changedData: any) {
    const transformedData: any = {};
  
    Object.entries(changedData).forEach(([key, value]) => {
      if (value) {
        const transformedKey = keywordMapping[key] || key.charAt(0).toLowerCase() + key.slice(1); 
        transformedData[transformedKey] = value;
      }
    });

    return transformedData;
}
  

  const updateDataOnServer = async (dataValues: any) => {
    const transformedData = prepareDataForServer(dataValues)
    setIsLoading(true);
    let combinedData: any = {
      documentos: [], // Para armazenar os arquivos
      status: "Pendente"
    };
    // Adicione os dados do componente filho ao formData
    Object.entries(transformedData).forEach(([key, value]) => {
      if (typeof value === 'string' || value instanceof Blob) {
        combinedData[key] = value;
      }
    });
    fileState.forEach((fileobj, index) => {
      combinedData.documentos.push({
        arquivo: fileobj.file,
        descricao: fileobj.name,
      });
    });
    const formDataToSend = new FormData();
    
    //Preparando o que nao é documentos para ter a chave e valor.
    Object.keys(combinedData).forEach((key) => {
      if (key !== "documentos") {
        formDataToSend.append(key, combinedData[key]);
      } else {
        combinedData.documentos.forEach((documento:DocumentoType, index:number) => {
          formDataToSend.append(
            `documentos[${index}].descricao`,
             documento.descricao,
          );
          formDataToSend.append(
            `documentos[${index}].arquivo`,
            documento.arquivo,
          );
        });
      }
    });
    
    try { 
      const response = await apipublic.patch(`atualizarequest/${processId}/`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Esperar 2 segundos (2000 milissegundos) depois de receber a resposta
      await new Promise((resolve) => setTimeout(resolve, 5000));


      toast.success("Dados enviados com sucesso")
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar os dados", error);
      setIsLoading(false);
    }
  
  };

  return (
    <>
      {isLoading && <LoadingComponent/>}
    <form onSubmit={handleSubmit(onSubmitForm)}>
    <div className="mx-auto w-full max-w-4xl">
      
      <h1 className="text-center font-semibold text-2xl text-blue-900">Informações do Processo</h1>
      <h2 className="text-left font-semibold text-2xl text-black mt-5">
        Processo numero: {processId}
      </h2>
      <button 
                    id="downloadButton" 
                    type="submit" 
                    className="inline-flex justify-center rounded-md mt-5
                               bg-orange-400 px-3 py-2 text-sm font-semibold 
                               text-white shadow-sm hover:orange-300 focus-visible:outline 
                               focus-visible:outline-2 focus-visible:outline-offset-2 
                               focus-visible:outline-orange-800"
                  >
                    Atualizar Dados
                  </button>
      
      {processData && typeof processData === 'object' &&
        Object.entries(processData)
        .filter(([key]) => !propriedadesExcluidas.includes(key))
        .map(([key, value]) => {
          if (!value) return null;
         
            // Se o campo for "documentos", renderize os links para baixar
            if (key === "documentos" && Array.isArray(value)) {
              return (
                <div key={key} className="mt-5">
                  <h2 className="text-lg font-bold leading-6 text-black mb-3">Documentos Anexado</h2>
                  {value.map((documento, index) => (
                    <div key={index} className="mb-2">
                      <Link href={documento.arquivo} download target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                        Baixar: {documento.descricao}
                      </Link>
                    </div>
                  ))}
                  <div className="border-b border-gray-200 my-4"></div>
                </div>
              );
            }
        
          // Se o valor for um objeto, renderize seus subcampos
          if (typeof value === 'object') {
            return (
              <>
              <h2 className="text-lg font-bold leading-6 text-black mt-5">Afiliado Responsável Pelo Processo:</h2>
              <div key={key} className="mt-2 grid grid-cols-2 gap-3 items-center">
          
                <div>
                  {Object.entries(value)
                    .filter(([subKey]) => !propriedadesExcluidasAfiliado.includes(subKey))
                    .map(([subKey, subValue]) => (
                      <div key={subKey} className="mt-1">
                        <label htmlFor={subKey} className="block text-base font-bold leading-6 text-blue-900">
                          {subKey}:
                        </label>
                        <input
                          {...register(`${key}.${subKey}`)}
                          type="text"
                          id={subKey}
                          defaultValue={subValue!.toString()}
                          style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                          className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                                    text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                    focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    
                        />
                        
                      </div>
                      
                    ))}
                    
                </div>
               
              </div>
               <div className="border-b border-gray-200 my-4"></div>
               <h2 className="text-lg font-bold leading-6 text-black mt-5">Dados do Processo</h2>
               </>
              
            );
          }
         
          // Se não for um objeto, renderize como um campo normal
          return (
            <>
            
            <div key={key} className="mt-5 grid grid-cols-2 gap-3 items-center">
              
              <label htmlFor={key} className="text-base font-bold leading-6 text-blue-900">
                {key}:
              </label>
              <div className="mt-2">
                <input
                  {...register(key)}
                  type="text"
                  id={key}
                  defaultValue={String(value || "")}
                  style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                  className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                            text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                />
              </div>
            </div>
            </>
          );
        })}
    </div>
    <UploadDocumentos
                      onFilesChange={handleFilesChange}
                      filesState={fileState}
                      removeFile={removeFile}
                    />
  </form>
  </>
  );
}