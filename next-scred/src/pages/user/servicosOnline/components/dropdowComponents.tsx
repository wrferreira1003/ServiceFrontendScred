import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { BuildingLibraryIcon, BuildingOffice2Icon, ClipboardDocumentCheckIcon, KeyIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';

const people = [
  {
    id:1,
    name: 'ATA NOTARIAL',
    imageUrl:
      <BuildingLibraryIcon />,
    classNameBorder: 'border border-red-300',
    linkNovoPedido: '/user/servicosOnline/atanotarial',
  },

  {
    id:2,
    name: 'RECONHECIMENTO DE FIRMA POR VERDADEIRO',
    imageUrl:
      <BuildingOffice2Icon />,
    classNameBorder: 'border border-green-500',
    linkNovoPedido: '/user/servicosOnline/firmaverdadeiro',
  },
  {
    id:3,
    name: 'RECONHECIMENTO DE FIRMA POR SEMELHANCIA',
    
    imageUrl:
      <BuildingOffice2Icon />,
    classNameBorder: 'border border-gray-500',
    linkNovoPedido: '/user/servicosOnline/firmasemelhancia',
  },
]

export default function DropdowComponents() {

  const router = useRouter();
  
  return (
    <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <li key={person.id} className={`${person.classNameBorder} col-span-1 divide-y divide-gray-900 rounded-lg bg-transparent shadow`}>
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            
            <div className="h-16 w-16 flex-shrink-0 rounded-full">
              {person.imageUrl}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="runcate text-1xl font-bold text-gray-900 break-all ">
                  {person.name}
                </h1>
              </div>
            </div>
            
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                
                <button
                  onClick={() => {
                    router.push(person.linkNovoPedido ||'/user/servicosOnline' );
                  }}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center 
                            justify-center gap-x-3 rounded-bl-lg border border-transparent 
                            py-4 text-sm font-semibold text-gray-900"
                >
                  <PlusCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  NOVO PEDIDO
                </button>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <button
                  onClick={() => {
                    router.push(`/user/requests`);
                  }}
                  className="relative inline-flex w-0 flex-1 items-center 
                            justify-center gap-x-3 rounded-br-lg border 
                            border-transparent py-4 text-sm font-semibold
                             text-gray-900"
                >
                  <ClipboardDocumentCheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  CONSULTA PEDIDO
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

  
