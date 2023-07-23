import { useState } from 'react'
import FormularioSolicitacao from '../Components/FormularioSolicitacao';
import FormularioConsulta from '../Components/FormularioConsulta';


export default function Tabelionato(){
  const [servico, setServico] = useState('');
  const [subservico, setSubServico] = useState('');

  const handleServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setServico(event.target.value);
  }
  const handleSubServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubServico(event.target.value);
  }

  console.log(servico);
  console.log(subservico);
  return (
    <div className="w-4/5 mx-auto">
      
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-xl font-semibold leading-7 text-gray-900">Solicitação de Serviços</h1>
              <p className="mt-1 text-sm leading-6 text-gray-600">
              Selecione o tipo de serviço desejado, optando por um novo documento ou uma consulta a um 
              documento existente. Além disso, escolha o tipo de serviço de tabelionato correspondente.
              </p>
              <div className="sm:col-span-3 mt-5">
                <label htmlFor="solicitacao" className="block text-sm font-medium leading-6 text-gray-900">
                  Tipo de Solicitação
                </label>
                <div className="mt-2">
                  <select
                    id="solicitacao"
                    autoComplete="solicitacao-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleServicoChange}
                  >
                    <option>Selecione o Tipo de Serviço</option>
                    <option>Nova Solicitação</option>
                    <option>Solicitação de Consulta</option>
                 
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3 mt-5">
                <label htmlFor="servico" className="block text-sm font-medium leading-6 text-gray-900">
                  Serviço Tabelionato
                </label>
                <div className="mt-2">
                  <select
                    id="servico"
                    autoComplete="servico-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleSubServicoChange}
                  >
                    <option>Selecione o serviço</option>
                    <option>Ata Notarial</option>
                    <option>Certidão</option>
                    <option>Escritura</option>
                    <option>Procuração</option>
                  </select>
                </div>
              </div>
            {(servico === 'Nova Solicitação' && subservico !== 'Selecione o serviço') && (
              <div>
              <FormularioSolicitacao />
              </div>
            )}
            {servico === 'Solicitação de Consulta' &&(
              <div>
              <FormularioConsulta />
              </div>
            )}
            </div>
        </div>      
    </div>
  )
}