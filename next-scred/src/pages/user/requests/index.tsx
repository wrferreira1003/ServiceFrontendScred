import Header from "@/pages/Hcred/Home/Header";
import BannerComponents from "../../servicosOnline/components/bannerComponents";
import UserPedidos from "./componentes/userPedidos";
import { useEffect, useState } from "react";
import { InfoDataTypeRequests } from "@/types/Adm/types";
import { parseCookies } from "nookies";
import { apipublic } from "@/services/apipublic";
import { useApi } from "@/hooks/useApi";
import { any } from "zod";

export type DadosType = InfoDataTypeRequests[];

export default function ConsultaPedidos(){
  const { IdUser: IdUser } = parseCookies(); 
  const [dados, setDados] = useState<DadosType | undefined>(); // Estado para armazenar os dados
  const [carregando, setCarregando] = useState<boolean>(false); // Estado para monitorar o status da chamada da API

  //Utilizando o userSWR para trazer sempre os dados mais atualizado conforme alteracao feita do Administrador
  const {data} = useApi('listrequests/');
  useEffect(() => {
    if (data) {
        const dadosFiltrados = data.filter((request: any) => request.idCliente === IdUser);
        setDados(dadosFiltrados);
    }
  }, [data, IdUser ]);

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
