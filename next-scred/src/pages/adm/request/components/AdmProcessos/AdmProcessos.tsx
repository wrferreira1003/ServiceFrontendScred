import { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { InfoDataTypeRequests } from "@/types/Adm/types";
import { apipublic } from "@/services/apipublic";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from "react-toastify";
import { useApi } from "@/hooks/useApi";
import { AuthContext } from "@/context/AuthContext";
import ModalProcessos from "../modalProcessos";
import ModalStatusProcess from "../modalStatusProcess";
import ModalStatusPagamento from "../modalStatusPagamento";
import Link from "next/link";

type DadosType = InfoDataTypeRequests[];

const statuses = {
  Aprovado: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  "Em analise": "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  Recusado: "text-yellow-800 bg-red-200 ring-yellow-600/20",
};

type typeStatusUpdate = {
  id: number;
  status: string;
}
type AdmProcessosProps = {
  user_type: string;
};

type typeStatusUpdatePagamento = {
  id: number;
  statusPagamento: string
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AdmProcessos({user_type}: AdmProcessosProps) {

 
  const [carregando, setCarregando] = useState<boolean>(false);
  const [dados, setDados] = useState<DadosType | undefined>(); // Estado para armazenar os dados
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState<number | null>(null);
  const [isModalOpenStatus, setModalOpenStatus] = useState(false)
  const [isModalOpenPagamento, setModalOpenPagamento] = useState(false)
  const {user} = useContext(AuthContext);

  const id_afiliado = user?.id
  //Usando o Hook userSWR para atualizar e alterar os dados de imediato.
  const {data, mutate} = useApi(`listrequests`)
  useEffect(() => {
    setCarregando(true);
    if (data) {
        setDados(data);
        setCarregando(false);
    }
  }, [data]);
  
  const handleOpenModal = (id: number) => {
    setSelectedProcessId(id);
    setModalOpen(true);
  };

  const handleEditStatus = (id:number) => {
    setSelectedProcessId(id);
    setModalOpenStatus(true);
  };

  const handleEditPagamento = (id:number) => {
    setSelectedProcessId(id);
    setModalOpenPagamento(true);
  };
  
  
  //Funcao que envia o novo status ao servidor
  const handleSubmitStatus = (data:typeStatusUpdate) => {
    // Lógica para enviar a edição ao servidor
     apipublic.patch(`statusrequest/${data.id}/`, {status: data.status})
    .then(response => {
      toast.success('Status do processo atualizado com sucesso:', response.data.status);
      mutate()
      setModalOpenStatus(false);
    })
    .catch(error => {
      toast.error('Erro ao enviar os dados');
      console.error('Erro ao atualizar o status:', error);
    });
  };

  //Funcao que envia o novo status do pagamento ao servidor
  const handleSubmitPagamento = (data:typeStatusUpdatePagamento) => {
    // Lógica para enviar a edição ao servidor
     apipublic.patch(`alterar-status-pg/${data.id}/`, {status: data.statusPagamento})
    .then(response => {
      toast.success('Status do processo atualizado com sucesso:', response.data.status);
      mutate()
      setModalOpenStatus(false);
    })
    .catch(error => {
      toast.error('Erro ao enviar os dados');
      console.error('Erro ao atualizar o status:', error);
    });
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


  const status = dadosOrdenados[0]?.status || ''

  return (
    <div className="mt-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ul role="list" className="divide-y divide-gray-100">
      {dadosOrdenados.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                {item.transacao && item.transacao.servico.nome_servico ? item.transacao.servico.nome_servico : ''}
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
                  {item?.afiliado?.nome}
                </p>
                <p className="truncate">
                  Telefone Afiliado: {item?.afiliado?.telefone}</p>
                
                <p className="truncate">
                  Forma de Pagamento: {item?.FormaDePagamento}</p>

                <p className="truncate">
                  Status Pagamento: {item.transacao?.status}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Link
                href={`https://wa.me/${item.afiliado?.telefone}`}
                target="_blank"
                className="hidden rounded-md bg-slate-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                Falar com Afiliado<span className="sr-only"></span>
              </Link>

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
            
            { user_type !== 'ADMIN' && 
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
                        <button
                        onClick={() => {
                          if (item.id !== undefined) {
                            handleEditStatus(item.id);
                          }
                        }}
                      
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900",
                        )}
                        >
                          Editar Processo
                        <span className="sr-only"></span>
                        </button>
                      )}
                    </Menu.Item>
                    
                    <Menu.Item>
                      {({ active }) => (
                        <button
                        onClick={() => {
                          if (item.id !== undefined) {
                            handleEditPagamento(item.id);
                          }
                        }}
                      
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900",
                        )}
                        >
                          Pagamento
                        <span className="sr-only"></span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
               
                </Transition>
              </Menu>
            }

            </div>
          </li>
        ))}
      </ul>
      <ModalProcessos 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        processId={selectedProcessId}
      />
      <ModalStatusProcess 
        isOpen={isModalOpenStatus} 
        processId={selectedProcessId}
        onClose={() => setModalOpenStatus(false)} 
        handleSubmitStatus={handleSubmitStatus} 
        status = {status}
        />

      <ModalStatusPagamento 
        isOpen={isModalOpenPagamento} 
        processId={selectedProcessId}
        onClose={() => setModalOpenPagamento(false)} 
        handleSubmitStatus={handleSubmitPagamento} 
        statusPagamento = {status}
        />
        
    </div>
  );
}