import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import FormularioSigup from './FormularioSigup';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import LoadingComponent from '@/componentesGeral/ReactLoading';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  userId : number | null
  setOpenModal: (value: boolean) => void;
};
export default function ModalSigup({open, onClose, userId, setOpenModal }: ModalProps) {

  return (
    <div className="p-6">
            {/* Modal */}
            {open && (
                <div className="fixed z-10 inset-0 overflow-y-auto" 
                     aria-labelledby="modal-title" 
                     role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 
                                    px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Fundo da modal */}
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity" 
                              aria-hidden="true"></div>

                        {/* Conteúdo da modal */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" 
                              aria-hidden="true">&#8203;</span>
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Informações Usuários
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            
                                            < FormularioSigup userId ={userId}
                                              setOpenModal= {() => setOpenModal(false)}
                                              
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick= {onClose}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
  )
}

//Aqui estou fazendo verificaoes pelo lado do servidor next se existe o token
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { ["tokenAfiliado"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {

    },
  };
};
