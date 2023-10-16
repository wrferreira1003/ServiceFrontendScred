import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import HeaderAdmAfiliado from "../componentes/HeaderAdmAfiliados";
import { getApiClient } from "@/services/apiservidor";
import { InfoDataType } from "@/types/Adm/types";
import AdmHome from "./componentes/AdmHome/AdmHome";
import AfiliadoHome from "./componentes/AfiliadoHome/AfiliadoHome";

interface RequestProps {
  InfoData: InfoDataType;
}

export default function HomeAfiliado({ InfoData }: RequestProps) {

  return (
    <>
      <HeaderAdmAfiliado />
      {
        InfoData.user_type === 'ADMIN' ? 
          < AdmHome /> :
        InfoData.user_type === 'AFILIADO' ? 
          < AfiliadoHome /> :
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
