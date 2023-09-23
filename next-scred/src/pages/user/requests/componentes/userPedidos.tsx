import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { InfoDataTypeRequests } from "@/types/Adm/types";
import { useRouter } from "next/router";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


const statuses = {
  Finalizado: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Arquivado: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  pendente: "text-yellow-800 bg-red-300 ring-yellow-600/20",
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}


interface DadosType {
  dados: InfoDataTypeRequests[];
}

export default function UserPedidos(dados:DadosType) {
  const router = useRouter();
  


  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 mt-8 flex items-start justify-between">
        <h1>Processos em Andamento</h1>
        <button
          onClick={() =>{
            router.push('/user/servicosOnline');
          }}
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
      <ul role="list" className="bg-slate-50 divide-y divide-gray-300">
       {
        dados && dados.dados ?  
        dados.dados.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="ml-5 min-w-0">
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
            
            <div className="mr-5 flex flex-none items-center gap-x-4">
              <Link
                href={`https://wa.me/${item.afiliado?.telefone}`}
                target="_blank"
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                WhatsApp Afiliado<span className="sr-only">, </span>
              </Link>
            </div>
          </li>
        )): null}
      </ul>
    </div>
  );
}

