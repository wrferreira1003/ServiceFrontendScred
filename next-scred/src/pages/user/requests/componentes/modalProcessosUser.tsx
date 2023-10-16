import { Fragment, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { InfoDataTypeRequests } from '@/types/Adm/types';
import { apipublic } from '@/services/apipublic';
import { downloadWord } from '@/componentesGeral/downloadWord';
import LoadingComponent from '@/componentesGeral/ReactLoading';
import DynamicFormUser from '@/componentesGeral/DinamicFormUser';
import { useApi } from '@/hooks/useApi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  processId: number | null;
}

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
    {isLoading && <LoadingComponent/>}
    {isOpen && (
      <Fragment>
        <Dialog as="div" className="relative z-50" open={isOpen} onClose={setOpen}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all 
                 w-3/5 h-4/5 sm:max-w-3xl ">
                <div>
                
                  {isLoading ? (
                    <LoadingComponent/>
                  ) :(
                    processData && (
                    <>
                    
                      <DynamicFormUser
                        processData={processData} 
                        processId={processId}
                        onDeleteDocument = {handleDeleteDocument}
                        onClose = {onClose}
                        setProcessData =  {setProcessData}
                        mutate = {mutate}
                    />
                    
                    </>
                    )
                  )}
                </div>
                <div className="mt-5 flex justify-between">
                  
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md w-40
                                bg-blue-500 px-3 py-2 text-sm font-semibold 
                                text-white shadow-sm hover:bg-blue-800 focus-visible:outline 
                                focus-visible:outline-2 focus-visible:outline-offset-2 
                                focus-visible:outline-orange-800"
                      onClick={onClose}
                    >
                      Fechar
                    </button>
                  </div>
                  <div className="">
                    <button 
                      id="atualizaButton" 
                      onClick={() => downloadWord(processData)}
                      className="inline-flex justify-center rounded-md  w-40
                                bg-orange-400 px-3 py-2 text-sm font-semibold 
                                text-white shadow-sm hover:orange-800 focus-visible:outline 
                                focus-visible:outline-2 focus-visible:outline-offset-2 
                                focus-visible:outline-orange-800"
                    >
                      Baixar Dados
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