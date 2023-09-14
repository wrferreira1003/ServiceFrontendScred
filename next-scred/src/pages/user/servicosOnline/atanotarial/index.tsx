import Header from "@/pages/Hcred/Home/Header";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import NovoServico from "./components/NovoServicoGeral";
import { useServico } from "@/context/servicocontext";
import HeaderService from "@/pages/Hcred/Components/headerService";
import ConsultaServico from "./components/ConsultaServico";
import ReconhecimentoVerdadeiro from "../firmaverdadeiro/components/ReconhecimentoVerdadeiro";
import ReconhecimentoSemelhanca from "../firmasemelhancia/components/ReconhecimentoSemelhanca";

export default function AtaNotarial(){
  const router = useRouter();
  const { tokenUser: token } = parseCookies();
  const { servico, setServico, subservico, setSubServico } = useServico();
  const [isDisable, setIsDisable] = useState(false);
  
  //Monitora o token do usuario
  useEffect(() => {
    if (!token) {
      router.push('/user/acess');
    }
  }, [token, router]);

  const handleServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setServico(event.target.value);
  };
  const handleSubServicoChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSubServico(event.target.value);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mb-auto flex-grow pt-28">
        <Header />
      <div className="mx-auto w-3/5">
        <HeaderService
          isDisabled={isDisable}
          handleServicoChange={handleServicoChange}
          handleSubServicoChange={handleSubServicoChange}
        />
        {/* Solicitacao Novo Serviço */}
        {servico === "Nova Solicitação" && (
            <NovoServico /> //Todo: Preciso receber os dados do componente
          )}

        {/* Solicitacao de consulta */}
        {servico === "Solicitação de Consulta" && <ConsultaServico />}

      </div>
    </div>
  </div>
  )
}
