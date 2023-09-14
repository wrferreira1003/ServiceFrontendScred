import { useState } from "react";
import HeaderService from "../../Components/headerService";
import { useServico } from "@/context/servicocontext";
import NovoServico from "@/pages/user/servicosOnline/atanotarial/components/NovoServicoGeral";
import ReconhecimentoVerdadeiro from "@/pages/user/servicosOnline/firmaverdadeiro/components/ReconhecimentoVerdadeiro";
import ReconhecimentoSemelhanca from "@/pages/user/servicosOnline/firmasemelhancia/components/ReconhecimentoSemelhanca";
import ConsultaServico from "@/pages/user/servicosOnline/atanotarial/components/ConsultaServico";

export default function Tabelionato() {
  const { servico, setServico, subservico, setSubServico } = useServico();
  const [isDisable, setIsDisable] = useState(false);

  const handleServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setServico(event.target.value);
  };
  const handleSubServicoChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSubServico(event.target.value);
  };

  return (
    <div className=" mx-auto w-4/5">
      <HeaderService
        isDisabled={isDisable}
        handleServicoChange={handleServicoChange}
        handleSubServicoChange={handleSubServicoChange}
      />
      {/* Solicitacao Novo Serviço */}
      {(subservico === "Ata Notarial" ||
        subservico === "Emissão de Certidão" ||
        subservico === "Escritura") &&
        servico === "Nova Solicitação" && (
          <NovoServico /> //Todo: Preciso receber os dados do componente
        )}

      {/* Solicitacao de consulta */}
      {(subservico === "Ata Notarial" ||
        subservico === "Emissão de Certidão" ||
        subservico === "Escritura") &&
        servico === "Solicitação de Consulta" && <ConsultaServico />}

      {/* Reconhecimento por Verdadeiro*/}
      {subservico === "Reconhecimento de Firma por Verdadeiro" &&
        servico === "Nova Solicitação" && <ReconhecimentoVerdadeiro />}

      {/* Reconhecimento por Verdadeiro*/}
      {subservico === "Reconhecimento de Firma por Semelhança" &&
        servico === "Nova Solicitação" && <ReconhecimentoSemelhanca />}
    </div>
  );
}
