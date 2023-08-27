import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import FormularioSigup from './FormularioSigup';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  userId : number | null
};
export default function ModalSigup({open, onClose, userId }: ModalProps) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="relative z-40" data-dialog-action="nothing" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg
               bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6"
               data-dialog-action="nothing"
               >
                <div data-dialog-action="nothing" >
                  
                {userId && <FormularioSigup userId={userId} />}
                
                </div>
                <div className="mt-5 sm:mt-6">
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 p-2 rounded-full focus:outline-none hover:bg-gray-200 transition ease-in-out duration-150"
                  aria-label="Fechar"
                >
                  x

                </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
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
