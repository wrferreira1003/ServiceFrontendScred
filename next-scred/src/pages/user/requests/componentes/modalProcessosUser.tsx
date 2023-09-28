import { Fragment, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { InfoDataTypeRequests } from '@/types/Adm/types';
import { apipublic } from '@/services/apipublic';
import { downloadWord } from '@/componentesGeral/downloadWord';
import DynamicFormUser from './DinamicFormUser';
import UploadDocumentos from '@/componentesGeral/fomulario/uploadDocumentos/uploadDocumentos';
import { FileData } from '../../servicosOnline/atanotarial/components/NovoServicoGeral';


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
 
  useEffect(() => {
    if (processId) {
      setIsLoading(true);
      apipublic
        .get(`deleterequest/${processId}`)
        .then((response) => {  
          setProcessData(response.data);
          setIsLoading(false) 
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [processId]);
  

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
                <div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center w-8 h-8 rounded-full mt-32
                              bg-indigo-600 text-sm font-semibold text-white shadow-sm 
                              hover:bg-indigo-500 focus-visible:outline 
                              focus-visible:outline-2 focus-visible:outline-offset-2 
                              focus-visible:outline-indigo-600"
                    onClick={onClose}
                  >
                    X
                  </button>
                </div>
                  {!isLoading && processData && (
                    <>
                    <DynamicFormUser
                      processData={processData} 
                      processId={processId}
                      
         
                    />
                    
                    </>
                  )}
                </div>
                <div className="mt-5 sm:mt-6 flex gap-2">
                  

                  <button 
                    id="atualizaButton" 
                    onClick={() => downloadWord(processData)}
                    className="inline-flex justify-center rounded-md
                               bg-orange-400 px-3 py-2 text-sm font-semibold 
                               text-white shadow-sm hover:orange-300 focus-visible:outline 
                               focus-visible:outline-2 focus-visible:outline-offset-2 
                               focus-visible:outline-orange-800"
                  >
                    Baixar Dados
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