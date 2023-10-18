import { parseCookies } from "nookies";
import { getApiClient } from "@/services/apiservidor";
import { GetServerSideProps } from "next";
import { InfoDataType } from "@/types/Adm/types";
import UserLayoutAdm from "../adm/User_layout";
import AfiliadoProcessos from "../adm/request/components/AfiliadoProcessos/AfiliadoProcessos";


export interface RequestProps {
  InfoData: InfoDataType;
}
export default function RequestAfiliado({ InfoData }: RequestProps) {

  const user_type: string = InfoData.user_type
  
  return (
    <UserLayoutAdm texto="Propostas em Andamento">
            < AfiliadoProcessos/> 
    </UserLayoutAdm>
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