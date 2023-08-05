import { PhotoIcon } from '@heroicons/react/24/solid'
import { useCallback, useEffect, useState } from 'react'
import { DropzoneState, useDropzone } from 'react-dropzone'
import {filesize} from "filesize";

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

export default function UploadDocumentos(){  
  
  const [files, setFiles] = useState<any[]>([]); // Estado para armazenar os arquivos

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
    setFiles(prevFiles => [...prevFiles, ...uploadFiles]);
  
  }, []);

  useEffect(() => {
    console.log(files);
  },[files])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone(
    {
      onDrop,
      maxFiles:3,
      maxSize: 2 * 1024 * 1024, // 2MB
      accept:{
        'docs/pdf': ['.pdf'],
      }
    })

    const removeFile = (indexToRemove: number) => {
      setFiles(prevFiles => prevFiles.filter((file, index) => index !== indexToRemove));
    };

  
  return (
    <div className=" w-full">
     
      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 mt-10">
        Documentação : Anexar documentos como RG, CPF ou CNH, comprovante de endereço de todas as partes envolvidas no processo.
      </label>
      
      <div className="h-48 text-center mt-1 flex flex-col justify-center rounded-lg border border-dashed
                      border-gray-900/25 hover:border-gray-800"
      >
        <div {...getRootProps()} 
           className={`mb-2 ${isDragReject ? 'text-red-500 border-red-500' : isDragActive ? 'text-green-500 border-green-500' : 'border-gray-900/25'}`}

        >
        <div className="text-center">
          <PhotoIcon 
            className={`mx-auto h-12 w-12 text-gray-300 ${isDragReject ? 'text-red-500 border-red-500' : isDragActive ? 'text-green-500 border-green-500' : 'text-gray-300'}`}
            aria-hidden="true" 
          />
           
            <label
              htmlFor="dropzone-file"
            >
              <p className="pl-1">
            {isDragReject
              ? 'Arquivo não aceito, por favor, tente outro formato!'
            : isDragActive
              ? 'Solte o arquivo aqui'
            :'Carregar um arquivo ou arraste e solte'}
            </p>  
            </label>
      <input {...getInputProps({ multiple: true })} className='hidden' />
      </div>    
    </div>
    {/* Listar os nomes dos arquivos */}
    {files.map((file, index) => (
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
