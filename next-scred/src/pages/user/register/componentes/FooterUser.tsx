import { CheckBadgeIcon, ClipboardDocumentListIcon, ExclamationTriangleIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function FooterUser() {
  return (
    <div className="bg-white sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 border-gray-200 pt-10 sm:mt-5 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        
          <div className="relative pl-16 tex">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      < ClipboardDocumentListIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <span>Preencha com atenção</span>
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                  É de inteira responsabilidade do usuário a inserção dos dados corretos no 
                  formulário de cadastro sob pena de ser responsabilizado civil e 
                  criminalmente pelos danos que causar por indicar dados falsos.
                  </dd>
          </div>
          <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      < CheckBadgeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <span>Verifique com cuidado</span>
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                  O usuário também será responsabilizado pelas lesões causadas caso 
                  não mantenha as informações atualizadas ou as inclua de maneira incorreta ou inexata.  
                  </dd>
          </div>
          <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      < ExclamationTriangleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <span>Muita Atenção</span>
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                  Sempre Verifique se realmente está navegando em páginas acessadas a partir do site 
                  https://www.scredgo.com.br/ antes de preencher seus dados.
                  </dd>
          </div>
        </div>
       
      </div>
    </div>
  )
}
