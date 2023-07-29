import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

const statuses = {
  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
const projects = [
  {
    id: 1,
    name: 'Cartório de Tabelionato',
    href: '#',
    descricao: 'garantimos a segurança e autenticidade dos seus documentos jurídicos. Nossa gama de serviços inclui a preparação de escrituras públicas, procurações, testamentos e atas notariais, além do reconhecimento de firmas e autenticações de cópias de documentos. ',
  },
  {
    id: 2,
    name: 'Cartório de Tabelionato',
    href: '#',
    descricao: 'garantimos a segurança e autenticidade dos seus documentos jurídicos. Nossa gama de serviços inclui a preparação de escrituras públicas, procurações, testamentos e atas notariais, além do reconhecimento de firmas e autenticações de cópias de documentos. ',
  },
  {
    id: 3,
    name: 'Cartório de Tabelionato',
    href: '#',
    descricao: 'garantimos a segurança e autenticidade dos seus documentos jurídicos. Nossa gama de serviços inclui a preparação de escrituras públicas, procurações, testamentos e atas notariais, além do reconhecimento de firmas e autenticações de cópias de documentos. ',
  },
  {
    id: 4,
    name: 'Cartório de Tabelionato',
    href: '#',
    descricao: 'garantimos a segurança e autenticidade dos seus documentos jurídicos. Nossa gama de serviços inclui a preparação de escrituras públicas, procurações, testamentos e atas notariais, além do reconhecimento de firmas e autenticações de cópias de documentos. ',
  },
  {
    id: 5,
    name: 'Cartório de Tabelionato',
    href: '#',
    descricao: 'garantimos a segurança e autenticidade dos seus documentos jurídicos. Nossa gama de serviços inclui a preparação de escrituras públicas, procurações, testamentos e atas notariais, além do reconhecimento de firmas e autenticações de cópias de documentos. ',
  },
  {
    id: 6,
    name: 'Cartório de Tabelionato',
    href: '#',
    descricao: 'garantimos a segurança e autenticidade dos seus documentos jurídicos. Nossa gama de serviços inclui a preparação de escrituras públicas, procurações, testamentos e atas notariais, além do reconhecimento de firmas e autenticações de cópias de documentos. ',
  },
  {
    id: 7,
    name: 'Cartório de Tabelionato',
    href: '#',
    descricao: 'garantimos a segurança e autenticidade dos seus documentos jurídicos. Nossa gama de serviços inclui a preparação de escrituras públicas, procurações, testamentos e atas notariais, além do reconhecimento de firmas e autenticações de cópias de documentos. ',
  },
  {
    id: 8,
    name: 'Cartório de Tabelionato',
    href: '#',
    descricao: 'garantimos a segurança e autenticidade dos seus documentos jurídicos. Nossa gama de serviços inclui a preparação de escrituras públicas, procurações, testamentos e atas notariais, além do reconhecimento de firmas e autenticações de cópias de documentos. ',
  },

]

export default function Body() {
  return (    
    <div className="w-4/5 mx-auto">

      <h1 className="text-3xl mt-5 mb-7 text-gray-900">Solicitações de Serviços</h1>

      <ul role="list" className="w-full rounded-2xl">
  {projects.map((project) => (
    <li key={project.id} className="flex items-center justify-between gap-x-6 py-5 px-4 my-4 border bg-slate-100 rounded-lg">
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p className="text-lg font-semibold leading-6 text-slate-700">{project.name}</p>
        </div>
        <div className="mt-2 flex items-center gap-x-2 text-sm leading-5 text-gray-500">
          <p className="break-words">{project.descricao}</p>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <Link
          href="/Hcred/Tabelionato"
          className="hidden rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-blue-700 sm:block"
        >
          Nova Solicitação
        </Link>
      </div>
    </li>
  ))}
</ul>

    </div>
  )
}