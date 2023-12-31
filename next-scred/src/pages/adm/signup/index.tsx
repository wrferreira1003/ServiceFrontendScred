import { parseCookies } from "nookies";
import HeaderAdmAfiliado from "../componentes/HeaderAdmAfiliados";
import AdmSigup from "./componentes/AdmSigup/AdmSigup";
import { GetServerSideProps } from "next";
import { getApiClient } from "@/services/apiservidor";
import { InfoDataType } from "@/types/Adm/types";

interface RequestProps {
  InfoData: InfoDataType[]
}

export default function Signup({InfoData}: RequestProps){
  console.log(InfoData)
  return(
    <>
    <HeaderAdmAfiliado/>
    <AdmSigup  InfoData ={InfoData}/>
    </>
  )
}

//Aqui estou fazendo verificaoes pelo lado do servidor next se existe o token
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);

  const response = await apiClient.get("todos_afiliados");

  return {
    props: {
      InfoData: response.data,
    },
  };
};