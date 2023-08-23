import Image from "next/image";
import { CameraIcon, PencilIcon } from '@heroicons/react/24/solid'
import { useRef, MutableRefObject, useState } from "react";

export default function PerfilDados(){

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Estado para armazenar a imagem selecionada

  const handleIconClick = () => {
    if(fileInputRef.current) {
        fileInputRef.current.click();
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-full w-full relative">
        <div className="h-14 w-14 rounded-full mt-10">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Preview"
              width={150}
              height={150}
            />
          ) : (
            <CameraIcon className="h-6 w-6" />
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
      <h1 className="mt-5 text-center"
        >Wellington Rodrigues Ferreira
      </h1>
    </div>
   
    
  )
}