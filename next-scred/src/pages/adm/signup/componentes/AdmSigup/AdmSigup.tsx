import { Fragment, useState } from 'react'
import {EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import ModalSigup from '../ModalSigup'
import { InfoDataType } from '@/types/Adm/types'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Transition } from "@headlessui/react";
import { api } from '@/services/api'
import { CameraIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import { parseISO, format, isValid } from 'date-fns';
import { toast } from 'react-toastify'
import Router from 'next/router'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface RequestProps {
  InfoData: InfoDataType[];
}

export default function AdmSigup({InfoData}:RequestProps) {
  
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const formattedData = InfoData.map(info => {
      const parsedDate = parseISO(info.last_login);
      const formattedLogin = isValid(parsedDate) ? format(parsedDate, 'dd/MM/yyyy HH:mm') : 'Data não disponível';
      
      return {
        ...info,
        last_login: formattedLogin
      }
  })
  
  const style: React.CSSProperties = { maxHeight: '700px' };
  

  const deleteUser = async (userId: number) => {
    
      confirmAlert({
          
          message: 'Tem certeza de que deseja deletar este usuário?',
          buttons: [
              {
                  label: 'Sim',
                  onClick: async () => {
                      try {
                          const response = await api.delete(`afiliado/${userId}`);
                          toast.success('Usuário Deletado com Sucesso!');
                          Router.push("/adm/signup");
                      } catch (error) {
                          toast.error('Erro ao deletar o usuário.');
                      }
                  }
              },
              {
                  label: 'Não',
                  onClick: () => toast.info('Operação cancelada')
              }
          ]
      });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 mt-8 flex items-start justify-between">
        <h1 className='font-roboto text-lg mb-2'>Usuários Cadastrado</h1>
        <Link
          href={'/adm/createuser'}
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 
                  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-indigo-600"
        >
          <UserPlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Criar Usuário
        </Link>
      </div>
        <ul role="list" 
            className="divide-y divide-gray-400 space-y-4 overflow-y-auto"
            style={style} 
            >
           
          {formattedData.map((person) => (
            
            <li key={person.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-1 gap-x-4">
              {person.foto ? (
                <Image 
                className="h-14 w-14 flex-none rounded-full bg-gray-50" 
                src={person.foto} alt="" 
                width={50}
                height={50}
                />
              ) : (
                <CameraIcon className="h-14 w-14 flex-none rounded-full bg-gray-200" />
              )}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={person.bairro} className="hover:underline">
                      {person.nome}
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <span className='mr-1 font-bold'>Email:</span>
                    <a href={`mailto:${person.email}`} className="truncate hover:underline">
                      {person.email}
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <span className='mr-1 font-bold'>Função:</span>
                    <span className="truncate">{person.user_type}</span>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <span className='mr-1 font-bold whitespace-nowrap'>Ultimo Acesso:</span>
                    <span className="truncate">{person.last_login}</span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-5">
                

              
              <Menu as="div" className="relative flex-none">
              {({ open }) => (
              <>
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items static className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white divide-y
              divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => {
                        setSelectedUserId(person.id);
                        setOpenModal(true);
                      }}
                      className={classNames(
                        active ? "bg-indigo-500 text-white" : "text-gray-900",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Editar Usuário
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                    onClick={() => deleteUser(person.id)} 
                      className={classNames(
                        active ? "bg-indigo-500 text-white" : "text-gray-900",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Excluir
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>

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