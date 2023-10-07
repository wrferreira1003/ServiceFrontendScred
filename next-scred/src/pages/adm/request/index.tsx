import { parseCookies } from "nookies";
import HeaderAdmAfiliado from "../componentes/HeaderAdmAfiliados";
import { getApiClient } from "@/services/apiservidor";
import { GetServerSideProps } from "next";
import { InfoDataType } from "@/types/Adm/types";
import AdmProcessos from "./components/AdmProcessos/AdmProcessos";
import AfiliadoProcessos from "./components/AfiliadoProcessos/AfiliadoProcessos";
import BannerComponentsGeral from "@/componentesGeral/BannerComponentsGeral";

export interface RequestProps {
  InfoData: InfoDataType;
}
export default function Request({ InfoData }: RequestProps) {

  const user_type: string = InfoData.user_type
  
  return (
    <>
    <HeaderAdmAfiliado />
    <BannerComponentsGeral 
    texto="Propostas em Andamento"
    />
           
     {
        InfoData.user_type === 'ADMIN' ? 
        <>
        {console.log(InfoData.user_type)}
          <AdmProcessos user_type = {user_type} /> 
        </>
        :
        InfoData.user_type === 'AFILIADO' ? 
          < AfiliadoProcessos/> 
        :
        null
      }
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
