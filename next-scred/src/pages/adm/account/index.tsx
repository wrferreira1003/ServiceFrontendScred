
import { useContext, useState } from "react";
import { AuthContext } from '@/context/AuthContext'
import AdmAccount, { CreateUserData } from "./componentes/AdmAccount/AdmAccount";
import PerfilDados from "./componentes/PerfilDados";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import HeaderAdmAfiliado from "../componentes/HeaderAdmAfiliados";
import { InfoDataType } from "@/types/Adm/types";
import { api } from "@/services/api";
import { getApiClient } from "@/services/apiservidor";

interface RequestProps {
  InfoData: InfoDataType;
}

export default function Request({InfoData}: RequestProps){
  const { nome, foto } = InfoData
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);    

  //Imagem vindo do conponente filho do perfil
  const handleImageSelected = (imageSrc: File) => {
    setSelectedFile(imageSrc);
    setSelectedImage(URL.createObjectURL(imageSrc)); // convertendo o File em uma URL temporária
};
console.log(selectedImage)
console.log(selectedFile)

  //Funcao recebe os dados do componente filho para enviar ao servidor
  const handleUpdateData = async (data: CreateUserData, id:number) => {
    const combinedData = {
      ...data,
      foto: selectedFile // supondo que "image" seja a chave onde você quer armazenar a imagem no objeto de dados
    };
    try{
      const response = await api.patch(`afiliado/${id}`, combinedData,{
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Dados atualizados com sucesso!");
    } catch (error){
      console.error("Erro ao enviar dados", error);
      alert("Erro ao atualizar os dados. Por favor, tente novamente.");
    }
  }

  return (
   <>
    <HeaderAdmAfiliado />

    <div className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl items-start 
                    gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        
        <aside className="w-64 h-86 bg-slate-200 p-2 mb-4 lg:mb-0 rounded-lg">
          <PerfilDados 
          infoDataPerfil= {{nome, foto}}
          onImageSelected = {handleImageSelected}
          />
        </aside>
        
        <main className="flex-1 bg-slate-200 rounded-lg p-4">
          <AdmAccount 
          infoData = {InfoData}
          onUpdateData={handleUpdateData}
          />
        </main>
      </div>
    </>
  )
}
//Aqui estou fazendo verificaoes pelo lado do servidor next se existe o token
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const apiClient = getApiClient(ctx)
  
  const { ['tokenAfiliado']: token} = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const response = await apiClient.get('afiliado');

  return {
    props: {
      InfoData: response.data
    }
  }
  }