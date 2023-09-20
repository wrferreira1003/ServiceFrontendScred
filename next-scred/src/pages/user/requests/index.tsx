import Header from "@/pages/Hcred/Home/Header";
import BannerComponents from "../servicosOnline/components/bannerComponents";
import UserPedidos from "./componentes/userPedidos";
import { useEffect, useState } from "react";
import { InfoDataTypeRequests } from "@/types/Adm/types";
import { parseCookies } from "nookies";
import { apipublic } from "@/services/apipublic";

export type DadosType = InfoDataTypeRequests[];

export default function ConsultaPedidos(){
  const { IdUser: IdUser } = parseCookies(); 
  const [dados, setDados] = useState<DadosType | undefined>(); // Estado para armazenar os dados
  const [carregando, setCarregando] = useState<boolean>(false); // Estado para monitorar o status da chamada da API


  useEffect(() => {
    setCarregando(true);
    if (IdUser) {
      apipublic
        .get(`requests/${IdUser}`)
        .then((response) => {
          setDados(response.data); 
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setCarregando(false);
        });
    } else {
      setCarregando(false);
    }
  }, [IdUser]);
  
  return (
    <div className="flex min-h-screen flex-col">
          <div className="mb-auto flex-grow pt-28">
            <Header />
            <BannerComponents/>
            {dados && <UserPedidos dados={dados} />}
          </div>
    </div>
  )
}
