import UserPedidos from "./componentes/userPedidos";
import { useEffect, useState } from "react";
import { InfoDataTypeRequests } from "@/types/Adm/types";
import { parseCookies } from "nookies";
import { useApi } from "@/hooks/useApi";
import UserLayout from "../UserLayout";
import ButtonComponent from "@/componentesGeral/button";
import { useRouter } from 'next/router';

export type DadosType = InfoDataTypeRequests[];

export default function ConsultaPedidos(){
  const { tokenUser: token } = parseCookies();

  const { IdUser: IdUser } = parseCookies(); 
  const [dados, setDados] = useState<DadosType | undefined>(); // Estado para armazenar os dados
  const router = useRouter()
  //Utilizando o userSWR para trazer sempre os dados mais atualizado conforme alteracao feita do Administrador
  const {data} = useApi(`pedidos_por_cliente/${IdUser}`);
 
  useEffect(() => {
    if (!token) {
      router.push('/user/acess');
    }
  }, [token, router]);

  useEffect(() => {
    if (data) {
        setDados(data);
    }
  }, [data, IdUser ]);

  return (
    <UserLayout>
      <div className="flex min-h-screen flex-col">
            <div className="mb-auto flex-grow">
              {
                dados && dados.length > 0 ? <UserPedidos dados={dados} /> 
              : 
              <div className="text-center mt-28 text-gray-600">
                <p>Você ainda não tem nenhum processo disponível.</p>
                <ButtonComponent
                    className="mt-5"
                    nome='Nova Solicitação'
                    onClick={() => {router.push(`/user/newservice`)}}
                    />
              </div>
              }
            </div>
      </div>
    </UserLayout>
  )
}
