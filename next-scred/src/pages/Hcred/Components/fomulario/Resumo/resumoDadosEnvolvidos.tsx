import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function ResumoDadosEnvolvido({InfoPessoal, Documentos,Endereco}:any){
  return (
    <div className="w-full">
      <div className="px-4 sm:px-0 border-t">
        <h3 className="text-base  font-semibold leading-7 text-gray-900 mt-5">Confira as Informações do envolvido</h3>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-5 ">
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Nome Envolvido:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{InfoPessoal.nomeenvolvido}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Sobrenome Envolvido:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{InfoPessoal.sobrenomeenvolvido}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">CPF:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{Documentos.cpfenvolvido}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Identidade:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{Documentos.rgenvolvido}</dd>
          </div>

          </dl>
        
        
  
      </div>
    </div>
  )
}