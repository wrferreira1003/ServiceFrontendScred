import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function ResumoCartorio({ Cartorio }: any) {
  return (
    <div className="w-full">
      <div className="border-t px-4 sm:px-0">
        <h3 className="mt-5  text-base font-semibold leading-7 text-gray-900">
          Confira as Informações do Cartorio
        </h3>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-5 ">
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="font-roboto text-sm font-bold leading-6 text-gray-900">
              Nome:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">
              {Cartorio?.cartorio}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="font-roboto text-sm font-bold leading-6 text-gray-900">
              Estado do Cartório:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">
              {Cartorio?.estadolivro}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="font-roboto text-sm font-bold leading-6 text-gray-900">
              Livro:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">
              {Cartorio?.livro}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="font-roboto text-sm font-bold leading-6 text-gray-900">
              Folha::
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">
              {Cartorio?.folha}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
