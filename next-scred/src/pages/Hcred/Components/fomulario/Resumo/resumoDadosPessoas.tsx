import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function ResumoDadosPessoas({InfoPessoal, Documentos, Endereco}:any){
  return (
    <div className="w-full">
      <div className="px-4 sm:px-0 border-t">
        <h3 className="text-base  font-semibold leading-7 text-gray-900 mt-5">Confira as Informações Pessoal</h3>
    
      </div>
      <div className="mt-6">
        <dl className="grid sm:grid-cols-6">
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Nome:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{InfoPessoal?.nome}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Sobrenome:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{InfoPessoal?.sobrenome}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Email:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{InfoPessoal?.email}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Telefone:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{InfoPessoal?.telefone}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">CPF:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{Documentos?.cpf}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Identidade:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{Documentos?.rg}</dd>
          </div>
          </dl>
          <div className="px-4 sm:px-0 border-t">
          <h3 className="text-base  font-semibold leading-7 text-gray-900 mt-5">Confira o seu endereço</h3>
          </div>
        <dl className="grid grid-cols-1 sm:grid-cols-3">
          <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Endereço:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1 truncate">{Endereco?.endereco}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Estado:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1 truncate">{Endereco?.estado}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Cidade:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1 truncate">{Endereco?.cidade}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Bairro:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1 truncate">{Endereco?.bairro}</dd>
          </div>
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Cep:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1 truncate">{Endereco?.cep}</dd>
          </div>
          </dl>    
      </div>
    </div>
  )
}