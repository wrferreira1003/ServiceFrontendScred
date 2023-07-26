
type HandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => void;

interface ChildComponentProps {
  handleServicoChange: HandleChange;
  handleSubServicoChange: HandleChange;
}
export default function HeaderService({handleServicoChange, handleSubServicoChange}: ChildComponentProps){
    return (
        <div>
          <h1 className="text-2xl font-semibold leading-7 text-gray-900">
            Solicitação de Serviços</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">
          Por gentileza, selecione o tipo de serviço que atenda às suas necessidades, 
          seja para a solicitação de um novo documento ou para a consulta de um documento 
          preexistente. Além disso, indique o tipo de serviço de tabelionato correspondente 
          à sua solicitação. Uma vez realizada a seleção, você será redirecionado para o 
          preenchimento do formulário correspondente.
          </p>
          <div className="flex gap-x-16">
            <div className="sm:col-span-3 mt-5">
              <label htmlFor="solicitacao" 
                    className="block text-lg font-bold leading-6 text-gray-900">
                    Tipo de Solicitação
              </label>
              <div className="mt-2">
                <select
                  id="solicitacao"
                  autoComplete="solicitacao-name"
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

            <div className="sm:col-span-3 mt-5">
              <label htmlFor="solicitacao" 
                    className="block text-lg font-bold leading-6 text-gray-900">
                    Selecione o Serviço
              </label>
              <div className="mt-2">
                <select
                  id="solicitacao"
                  autoComplete="solicitacao-name"
                  className="block w-64 rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:max-w-xs 
                            sm:text-sm sm:leading-6"
                  onChange={handleSubServicoChange}
                > 
                  <option>Tipo de Serviço</option>
                  <option>Ata Notarial</option>
                  <option>Emissão de Certidão</option>
                  <option>Escritura</option>
                    
                </select>
              </div>
            </div>
          </div>
        </div>
  )
}