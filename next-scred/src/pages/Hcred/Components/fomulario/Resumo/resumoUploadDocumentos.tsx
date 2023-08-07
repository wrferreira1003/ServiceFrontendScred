import {FileData} from '../../NovoServicoGeral'


interface UploadDocumentosProps {
  fileState:FileData[];
}

export default function ResumoUploadDocumentos({ fileState }: UploadDocumentosProps) {
  return (
    <div className="w-full">
      <div>
        <h3 className="font-semibold text-gray-900 mt-5">Confira Seus Arquivos</h3>
      </div>
      <div className="mt-4">
       
          <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Nome Arquivo:</dt>
            {fileState && fileState.map((file: any, index: number) => (
              <div key={index}>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{`-${file.name}`}</dd>
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}