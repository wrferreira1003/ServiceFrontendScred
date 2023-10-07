import { Fragment, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { InfoDataTypeRequests } from '@/types/Adm/types';
import { apipublic } from '@/services/apipublic';
import DynamicForm from './DynamicForm';
import { downloadWord } from '@/componentesGeral/downloadWord';
type StatusUpdate = {
  processId: number;
  statusPagamento: string; // Ou qualquer outro tipo que você deseje usar para o status
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmitStatus: (data: typeStatusUpdate) => void;
  processId: number | null;
  statusPagamento: string;
}
type ProcessData = {
  [key: string]: any;
};

type DadosType = InfoDataTypeRequests[];

type typeStatusUpdate = {
  id: number;
  statusPagamento: string;
}

export default function ModalStatusPagamento({isOpen, onClose, processId, handleSubmitStatus, statusPagamento}:ModalProps) {
  const [open, setOpen] = useState(true)
  const [processData, setProcessData] = useState<DadosType | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPagamento, setSelectedPagamento] = useState(processData ? statusPagamento : ""); // Inicializado com o status atual do servidor se disponível


  const handleSubmit = () => {
    if (!processId) return

    const data: typeStatusUpdate = {
      id: processId,
      statusPagamento: selectedPagamento
    };
    handleSubmitStatus(data);
  };

  //Caso a modal seja fechada com um novo valor eu retorno o valor do servidor
  const handleCloseModal = () => {
    onClose() //Fechar modal
    setSelectedPagamento(statusPagamento);
}

  return (
    <>
    {isOpen && (
      <Fragment>
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={setOpen}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                                         bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all 
                                         w-3/5 h-4/5 sm:max-w-3xl ">
                  {!isLoading && (
                   <>
                    <h1 className="text-center font-semibold text-2xl text-blue-900">Editar Status do Pagamento</h1>
                    <h2 className="text-left font-semibold text-2xl text-black mt-5">
                      Processo numero: {processId}
                    </h2>
                    <div className="mt-4">
                      <label htmlFor="statusSelect" className="block text-sm font-medium text-gray-700">
                        Status Atual:
                      </label>
                      <select 
                        id="statusSelect" 
                        value={selectedPagamento} 
                        onChange={(e) => setSelectedPagamento(e.target.value)}
                        className="mt-2 p-2 w-full border rounded">
                            <option value="PENDENTE">Pendente de Pagamento</option>
                            <option value="PAGO">Pago</option>
                        {/* Adicione outras opções conforme necessário */}
                      </select>
                    </div>
                   </>
                  )}
                <div className='flex gap-5'>
                  <div className="mt-5 sm:mt-6 flex gap-2">
                    <button
                      type="button"
                      className="inline-flex  justify-center rounded-md w-28
                                bg-indigo-600 px-3 py-2 text-sm font-semibold
                                  text-white shadow-sm hover:bg-indigo-500 
                                  focus-visible:outline focus-visible:outline-2 
                                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleCloseModal}
                    >
                      VOLTAR
                    </button>
                  </div>

                  <div className="mt-5 sm:mt-6 flex gap-2">
                    <button
                      type="button"
                      className="inline-flex  justify-center rounded-md w-28
                                bg-orange-400 px-3 py-2 text-sm font-semibold 
                                text-white shadow-sm hover:orange-300 focus-visible:outline 
                                  focus-visible:outline-2 focus-visible:outline-offset-2 
                                focus-visible:outline-orange-800"
                      onClick={handleSubmit}
                    >
                      ATUALIZAR
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Fragment>
    )}
    </>
  )
}