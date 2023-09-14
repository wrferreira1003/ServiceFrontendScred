import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const statuses = {
  Finalizado: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Arquivado: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};
const projects = [
  {
    id: 1,
    name: "Processo 1",
    href: "#",
    status: "Finalizado",
    createdBy: "Wellington Ferreira",
    dueDate: "Março 17, 2023",
    dueDateTime: "2023-03-17T00:00Z",
  },
  {
    id: 2,
    name: "Processo 2",
    href: "#",
    status: "Aguardando Documentos",
    createdBy: "Alexandre Rodriguez",
    dueDate: "May 5, 2023",
    dueDateTime: "2023-05-05T00:00Z",
  },
  {
    id: 3,
    name: "Processo 3",
    href: "#",
    status: "Arquivado",
    createdBy: "Courtney Henry",
    dueDate: "May 25, 2023",
    dueDateTime: "2023-05-25T00:00Z",
  },
  {
    id: 4,
    name: "Processo 4",
    href: "#",
    status: "Arquivado",
    createdBy: "Leonard Krasner",
    dueDate: "June 7, 2023",
    dueDateTime: "2023-06-07T00:00Z",
  },
  {
    id: 5,
    name: "Processo 5",
    href: "#",
    status: "Finalizado",
    createdBy: "Courtney Henry",
    dueDate: "June 10, 2023",
    dueDateTime: "2023-06-10T00:00Z",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function UserPedidos() {
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
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {project.name}
                </p>
                <p
                  className={classNames(
                    statuses[project.status as keyof typeof statuses],
                    "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  )}
                >
                  {project.status}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  Due on{" "}
                  <time dateTime={project.dueDateTime}>{project.dueDate}</time>
                </p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate">Created by {project.createdBy}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Link
                href={project.href}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                Abrir processo<span className="sr-only">, {project.name}</span>
              </Link>
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
                          Editar<span className="sr-only">, {project.name}</span>
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
                          Mover<span className="sr-only">, {project.name}</span>
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
                          <span className="sr-only">, {project.name}</span>
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
    </div>
  );
}