import { PhotoIcon } from '@heroicons/react/24/solid'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {filesize} from "filesize";
import {FileData} from '../../NovoServicoGeral'


type UploadFile = {
  file: File;
  name: string;
  id: string;
  //readaSize: string; // você pode ajustar isso conforme a função filesize
  preview: string;
  progress: number;
  upload: boolean;
  error: boolean;
  url: null;
};


interface UploadDocumentosProps {
  onFilesChange: (files: any[]) => void;
  removeFile: (index: number) => void;
  filesState:FileData[];
}

export default function UploadDocumentos({onFilesChange,filesState, removeFile}: UploadDocumentosProps){  
  
  const [parentFiles, setParentFiles] = useState<any[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadFiles: UploadFile[] = acceptedFiles.map(file => ({
      file,
      name: file.name,
      id: file.name,
      readaSize: filesize(file.size, {output: "string"}), // supondo que isso seja compatível com o tipo
      preview: URL.createObjectURL(file),
      progress: 0,
      upload: false,
      error: false,
      url: null,
    }));
    // Concatenar os novos arquivos com os existentes
    const newFiles = [...parentFiles, ...uploadFiles]
    setParentFiles(newFiles)

    onFilesChange(newFiles);

  }, [parentFiles]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone(
    {
      onDrop,
      maxFiles:2,
      maxSize: 2 * 1024 * 1024, // 2MB
      accept:{
        'application/pdf': ['.pdf'],
      }
    })
    
    const renderDragMessage = () => {
      if (isDragReject) {
        return {
          class: 'text-red-600 border-red-600',
          message:'Arquivo não aceito, por favor, Somente PDF!' 
        };
      } else if (parentFiles.length >= 3) {
        return {
          message: 'Limite máximo de arquivos atingido!',
          class: 'text-red-600 border-red-600',
          }
      } else if (parentFiles.some(file => file.size > 2 * 1024 * 1024)) {
        return {
            message: 'Arquivo muito grande! Limite de 2MB.',
            class: 'text-red-600 border-red-600',
          }
      } else if (isDragActive) {
        return {
            message: 'Solte o arquivo aqui',
            class: 'text-green-500 border-green-600'
        }
      } else {
        return {
          message: 'Carregar um arquivo ou arraste e solte',
          class: 'text-gray-500 border-gray-300 hover:border-gray-800'
        }
      }
    }
    
    const { class:dragClass, message: dragMessage} = renderDragMessage();

  return (
    <div className=" w-full">
     
      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 mt-10">
        Documentação : Anexar documentos como RG, CPF ou CNH, comprovante de endereço de todas as partes envolvidas no processo.
      </label>
      
      <div className={`h-48 text-center mt-1 flex flex-col justify-center rounded-lg border border-dashed
                     ${dragClass}
                      hover:border-gray-800`}
      >
        <div {...getRootProps()} 
           className={`mb-2 ${dragClass}`}

        >
        <div className="text-center">
          <PhotoIcon 
            className={`mx-auto h-12 w-12 text-gray-300 ${dragClass}`}
            aria-hidden="true" 
          />
           
            <label
              htmlFor="dropzone-file"
            >
              <p className="pl-1">
                {dragMessage}
              </p> 
            </label>
      <input {...getInputProps({ multiple: true })} className='hidden' />
      </div>    
    </div>
    {/* Listar os nomes dos arquivos */}
    {filesState && Object.values(filesState).map((file: any, index: number) => (
                <div key={index}
                  className='flex justify-between ali text-xs mt-1 ml-4 mr-4'
                >
                  <p>{file.name}</p>
                  <p>Tamanho: {file.readaSize}</p>
                  <a href={file.preview} 
                     target="_blank" 
                     rel="noreferrer"
                     className='text-blue-300 hover:text-blue-600'
                  >Visualizar
                  </a>
                  <button 
                  className='text-blue-300 hover:text-blue-600'
                  onClick={() => removeFile(index)}
                  >
                    Excluir Arquivo
                  </button>
                </div>
              ))}
    </div>
  </div>
)
} 