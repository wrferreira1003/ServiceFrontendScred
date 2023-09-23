import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { InfoDataTypeRequests } from "@/types/Adm/types";
import { apipublic } from "@/services/apipublic";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ModalProcessos from "../modalProcessos";

type DadosType = InfoDataTypeRequests[];

const statuses = {
  Finalizado: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Arquivado: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AdmProcessos() {
  const [carregando, setCarregando] = useState<boolean>(false);
  const [dados, setDados] = useState<DadosType | undefined>(); // Estado para armazenar os dados
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState<number | null>(null);

  useEffect(() => {
    setCarregando(true);

      apipublic
        .get(`listrequest/`)
        .then((response) => {
          setDados(response.data);       
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setCarregando(false);
        });
    
  }, []);

  const handleOpenModal = (id: number) => {
    setSelectedProcessId(id);
    setModalOpen(true);
  };


  // Classifique os dados do mais novo para o mais antigo
  let dadosOrdenados: typeof dados = [];
  if (dados) {
    dadosOrdenados = [...dados].sort((a, b) => {
      const dateA = a.data_pedido ? new Date(a.data_pedido).getTime() : 0;
      const dateB = b.data_pedido ? new Date(b.data_pedido).getTime() : 0;
      return dateB - dateA; // do mais novo para o mais antigo
    });
  }
  

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 mt-8 flex items-start justify-between">
        <h1>Processos em Andamento</h1>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 
                  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-indigo-600"
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Nova Solicitação
        </button>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
      {dadosOrdenados.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {item.servico !== null ? item.servico : ''}
                  </p>
                  <p>-</p>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                  {item.subservico !== 'null' ? item.subservico : ''}
                </p>
                <p
                  className={classNames(
                    statuses[item.status as keyof typeof statuses],
                    "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  )}
                >
                  {item.status}
                </p>
              </div>
              <div className="mt-1 flex-col items-center gap-x-2 text-sm leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  Data Solicitação:{" "}
                  {
                    item?.data_pedido 
                    ? format(new Date(item?.data_pedido), 'dd/MM/yyyy - HH:mm', { locale: ptBR })
                    : null
                  }
                </p>
                <p className="whitespace-nowrap">
                  N Processo:{" "}
                  {item?.id}
                </p>

                <p className="whitespace-nowrap">
                  Afiliado:{" "}
                  {item.afiliado?.nome}
                </p>
                <p className="truncate">Telefone: {item.afiliado?.telefone}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <button
                onClick={() => {
                  if (item.id !== undefined) {
                    handleOpenModal(item.id);
                  }
                }}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                Abrir processo<span className="sr-only"></span>
              </button>
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900",
                          )}
                        >
                          Editar<span className="sr-only"></span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900",
                          )}
                        >
                          Mover<span className="sr-only"></span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900",
                          )}
                        >
                          Deletar
                          <span className="sr-only"></span>
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
      <ModalProcessos 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        processId={selectedProcessId}
      />
    </div>
  );
}