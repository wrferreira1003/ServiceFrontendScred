import { Fragment, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { InfoDataTypeRequests } from '@/types/Adm/types';
import { apipublic } from '@/services/apipublic';
import { downloadWord } from '@/componentesGeral/downloadWord';
import DynamicFormUser from '@/componentesGeral/DinamicFormUser';
import { useApi } from '@/hooks/useApi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  processId: number | null;
}
type ProcessData = {
  [key: string]: any;
};

type DadosType = InfoDataTypeRequests[];


export default function ModalProcessos({isOpen, onClose, processId}:ModalProps) {
  const [open, setOpen] = useState(true)
  const [processData, setProcessData] = useState<DadosType | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { data, mutate } = useApi(`deleterequest/${processId}`);
  useEffect(() => {
    if(data){
      setProcessData(data)
    }
  }, [data, processId]);

  // Função para excluir um documento de processData
  const handleDeleteDocument = (docId: number) => {
    setProcessData(prevData => {
      if (!prevData) return prevData;
      // @ts-ignore
      if (!prevData || !prevData.documentos) return prevData;
      
      return {
        ...prevData,
        // @ts-ignore
        documentos: prevData.documentos.filter(documento => documento.id !== docId)
      };
    });
  };

  return (
    <>
    {isOpen && (
      <Fragment>
        <Dialog as="div" className="relative z-50" open={isOpen} onClose={setOpen}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all mt-16 mb-5
                 w-3/5 h-4/5 sm:max-w-3xl ">
                <div>
                  {!isLoading && processData && (
                    <DynamicFormUser 
                      processData={processData} 
                      processId={processId}
                      onDeleteDocument = {handleDeleteDocument}
                      onClose = {onClose}
                      setProcessData =  {setProcessData}
                      mutate={mutate}
                    />
                  )}
                </div>
                <div className="mt-5 sm:mt-6 flex gap-2">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md
                               bg-indigo-600 px-3 py-2 text-sm font-semibold
                                text-white shadow-sm hover:bg-indigo-500 
                                focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onClose}
                  >
                    FECHAR
                  </button>
    
                  <button 
                    id="downloadButton" 
                    onClick={() => downloadWord(processData)}
                    className="inline-flex w-full justify-center rounded-md
                               bg-orange-400 px-3 py-2 text-sm font-semibold 
                               text-white shadow-sm hover:orange-300 focus-visible:outline 
                               focus-visible:outline-2 focus-visible:outline-offset-2 
                               focus-visible:outline-orange-800"
                  >
                    Baixar
                  </button>
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
