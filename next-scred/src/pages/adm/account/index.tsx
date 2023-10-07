import {useState } from "react";
import AdmAccount, {
CreateUserData,
} from "./componentes/AdmAccount/AdmAccount";
import PerfilDados from "./componentes/PerfilDados";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import HeaderAdmAfiliado from "../componentes/HeaderAdmAfiliados";
import { InfoDataType } from "@/types/Adm/types";
import { api } from "@/services/api";
import { getApiClient } from "@/services/apiservidor";
import AfiliadoAccount from "./componentes/AfiliadoAccount/AfiliadoAccount";
import PasswordValid from "../componentes/PasswordValid";
import { toast } from "react-toastify";

interface RequestProps {
  InfoData: InfoDataType;
}

export default function Request({ InfoData }: RequestProps) {
  const { nome, foto } = InfoData;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //Imagem vindo do conponente filho do perfil
  const handleImageSelected = (imageSrc: File) => {
    setSelectedFile(imageSrc);
    setSelectedImage(URL.createObjectURL(imageSrc)); // convertendo o File em uma URL temporária
  };

  //Funcao recebe os dados do componente filho para enviar ao servidor
  const handleUpdateData = async (data: CreateUserData, id: number) => {
    const combinedData = {
      ...data,
      foto: selectedFile, // supondo que "image" seja a chave onde você quer armazenar a imagem no objeto de dados
    };
    try {
      const response = await api.patch(`afiliado/${id}`, combinedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Cadastro atualizado com sucesso.");
    } catch (error) {
      toast.error("Erro ao tentar atualizar.");
    }
  };

  return (
    <>
      <HeaderAdmAfiliado />

      <div
        className="mx-auto flex w-full max-w-7xl flex-col items-start gap-x-8 
                    px-4 py-10 sm:px-6 lg:flex-row lg:px-8"
      >
        <aside className="h-86 mb-4 w-64 rounded-lg bg-slate-200 p-2 lg:mb-0">
          <PerfilDados
            infoDataPerfil={{ nome, foto }}
            onImageSelected={handleImageSelected}
          />
        </aside>

        <main className="flex-1 rounded-lg bg-slate-200 p-4">
        {
        InfoData.user_type === 'ADMIN' ?
          <AdmAccount 
            infoData={InfoData} 
            onUpdateData={handleUpdateData} 
          /> 
        :
        InfoData.user_type === 'AFILIADO' ? 
          < AfiliadoAccount 
            infoData={InfoData} 
            onUpdateData={handleUpdateData} 
            /> 
        :
        null
      }

        <PasswordValid
          InfoId={{ id: InfoData.id }} 
        />

        </main>
      </div>
    </>
  );
}
//Aqui estou fazendo verificaoes pelo lado do servidor next se existe o token
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);

  const { ["tokenAfiliado"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const response = await apiClient.get("afiliado");

  return {
    props: {
      InfoData: response.data,
    },
  };
};
