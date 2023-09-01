import { useEffect, useState } from "react";
import { api } from "@/services/api";

type HandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => void;

interface ChildComponentProps {
  handleServicoChange: HandleChange;
  handleSubServicoChange: HandleChange;
  isDisabled: boolean;
}
interface ApiServido {
  id: number;
  nome_servico: string;
  tipo: string;
}
export default function HeaderService({
  handleServicoChange,
  handleSubServicoChange,
  isDisabled,
}: ChildComponentProps) {
  const [dadosServicoApi, setDadosServicoApi] = useState<ApiServido[]>([]);

  useEffect(() => {
    api
      .get("servicos")
      .then((res) => {
        setDadosServicoApi(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="font-roboto">
      <h1 className="text-2xl  leading-7 text-gray-900 mt-10">
        Solicitação de Serviços
      </h1>
      <p className="mt-4 mb-4 text-sm leading-6 text-gray-600">
        Por gentileza, selecione o tipo de serviço que atenda às suas
        necessidades, seja para a solicitação de um novo documento ou para a
        consulta de um documento preexistente. Além disso, indique o tipo de
        serviço de tabelionato correspondente à sua solicitação. Uma vez
        realizada a seleção, você será redirecionado para o preenchimento do
        formulário correspondente.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-x-16">
        <div className="mt-5 sm:col-span-3">
          <label
            htmlFor="solicitacao"
            className="block text-lg leading-6 text-gray-900"
          >
            Selecione o Serviço
          </label>
          <div className="mt-2">
            <select
              id="solicitacao"
              disabled={isDisabled}
              autoComplete="solicitacao-name"
              required
              className="block w-64 rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:max-w-xs 
                            sm:text-sm sm:leading-6"
              onChange={handleSubServicoChange}
            >
              <option>Tipo de Serviço</option>
              {dadosServicoApi.map((servico) => (
                <option key={servico.id} value={servico.nome_servico}>
                  {servico.nome_servico}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 sm:col-span-3">
          <label
            htmlFor="solicitacao"
            className="block text-lg  leading-6 text-gray-900"
          >
            Tipo de Solicitação
          </label>
          <div className="mt-2">
            <select
              disabled={isDisabled}
              id="solicitacao"
              autoComplete="solicitacao-name"
              required
              className="block w-64 rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:max-w-xs 
                            sm:text-sm sm:leading-6"
              onChange={handleServicoChange}
            >
              <option>Selecione o Tipo de Serviço</option>
              <option>Nova Solicitação</option>
              <option>Solicitação de Consulta</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
