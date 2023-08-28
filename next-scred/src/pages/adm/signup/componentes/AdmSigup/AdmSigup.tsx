import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { CheckCircleIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import ModalSigup from '../ModalSigup'
import { InfoDataType } from '@/types/Adm/types'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'


interface RequestProps {
  InfoData: InfoDataType[];
}

export default function AdmSigup({InfoData}:RequestProps) {

  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 mt-8 flex items-start justify-between">
        <h1>Usuários Cadastrado</h1>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 
                  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-indigo-600"
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Criar Usuário
        </button>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {InfoData.map((person) => (
          <li key={person.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.foto} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a href={person.bairro} className="hover:underline">
                    {person.nome}
                  </a>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <a href={`mailto:${person.email}`} className="truncate hover:underline">
                    {person.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{person.user_type}</p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 
                            px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-indigo-600"
                onClick={() => {
                  setSelectedUserId(person.id)
                  setOpenModal(true)
                  
                }}
              >
                <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Editar
              </button>
              <ModalSigup userId={selectedUserId} open={openModal} setOpenModal={() => setOpenModal(false)}
                          onClose={() => {
                          setOpenModal(false);
                          setSelectedUserId(null);  // Reset selected user ID when closing modal
                          }} 
              />
            </div>
          </li>
        ))}
      </ul>
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