import Image from "next/image";
import { CameraIcon, PencilIcon } from '@heroicons/react/24/solid'
import { useRef, MutableRefObject, useState } from "react";

interface infoDataType {
  nome: string;
  foto: string;
}
interface PerfilDadosProps {
  infoDataPerfil: infoDataType;
  onImageSelected?: (file: File) => void;
}

export default function PerfilDados({infoDataPerfil, onImageSelected}: PerfilDadosProps){

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Estado para armazenar a imagem selecionada

  const { nome, foto } = infoDataPerfil || {}

  const handleIconClick = () => {
    if(fileInputRef.current) {
        fileInputRef.current.click();
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      
      if (onImageSelected) {
        onImageSelected(file);
        }
      };
  }


  return (
    <div>
      <div className="flex justify-center items-center h-full w-full relative">
        <div className="h-64 w-32 rounded-full mt-10">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Preview"
              width={150}
              height={150}
            />
            ) : foto ? (
              <Image
                src={foto}
                alt="Preview"
                width={150}
                height={150}
              />
          ) : (
            <CameraIcon className="h-64 w-32" />
          )}
        </div>
      <PencilIcon 
          className="h-6 w-6 absolute top-0 right-0 cursor-pointer" 
          onClick={handleIconClick} 
      />
      <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          className="hidden" 
      />
      
    </div>
      <h1 className="mt-5 mb-5 text-center">
        {nome}
      </h1>
    </div>
   
    
  )
}