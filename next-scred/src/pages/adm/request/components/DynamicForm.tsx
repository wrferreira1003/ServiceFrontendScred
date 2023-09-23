import { InfoDataTypeRequests } from "@/types/Adm/types";
import { useState } from "react"

interface DynamicFormProps {
  processData: InfoDataTypeRequests[];
  processId: number | null;
}

export default function DynamicForm({processData, processId}:DynamicFormProps){
  const [formData, setFormData] = useState<InfoDataTypeRequests[]>(processData);

  const handleChange = (key: string, value: any) => {
    setFormData(prevState => ({
        ...prevState,
        [key]: value
    }));
  };

  const handleNestedChange = (parentKey: string, key: string, value: any) => {
    setFormData(prevState => ({
        ...prevState,
        [parentKey as keyof typeof prevState]: {
          ...(prevState[parentKey as keyof typeof prevState] as Record<string, any>),
          [key]: value
        }
    }));
  };

  const propriedadesExcluidas = ['id', 'idCliente'];
  const propriedadesExcluidasAfiliado = ['id'];
  
  return (
    <div className="mx-auto w-full max-w-4xl mt-2">
      <h1 className="text-center font-semibold text-2xl text-blue-900">Informações do Processo</h1>
      <h2 className="text-left font-semibold text-2xl text-black mt-5">
        Processo numero: {processId}
      </h2>
      {processData && typeof processData === 'object' &&
        Object.entries(processData)
        .filter(([key]) => !propriedadesExcluidas.includes(key))
        .map(([key, value]) => {
          if (!value) return null;

            // Se o campo for "documentos", renderize os links para baixar
            if (key === "documentos" && Array.isArray(value)) {
              return (
                <div key={key} className="mt-5">
                  <h2 className="text-lg font-bold leading-6 text-black mb-3">Documentos Anexado</h2>
                  {value.map((documento, index) => (
                    <div key={index} className="mb-2">
                      <a href={documento.arquivo} download target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                        Baixar: {documento.descricao}
                      </a>
                    </div>
                  ))}
                  <div className="border-b border-gray-200 my-4"></div>
                </div>
              );
            }
        
          // Se o valor for um objeto, renderize seus subcampos
          if (typeof value === 'object') {
            return (
              <>
              <h2 className="text-lg font-bold leading-6 text-black mt-5">Afiliado Responsável Pelo Processo:</h2>
              <div key={key} className="mt-2 grid grid-cols-2 gap-3 items-center">
          
                <div>
                  {Object.entries(value)
                    .filter(([subKey]) => !propriedadesExcluidasAfiliado.includes(subKey))
                    .map(([subKey, subValue]) => (
                      <div key={subKey} className="mt-1">
                        <label htmlFor={subKey} className="block text-base font-bold leading-6 text-blue-900">
                          {subKey}:
                        </label>
                        <input
                          type="text"
                          id={subKey}
                          value={subValue!.toString()}
                          onChange={(e) => handleNestedChange(key, subKey, e.target.value)}
                          style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                          className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                                    text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                    focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                        />
                        
                      </div>
                      
                    ))}
                    
                </div>
               
              </div>
               <div className="border-b border-gray-200 my-4"></div>
               <h2 className="text-lg font-bold leading-6 text-black mt-5">Dados do Processo</h2>
               </>
              
            );
          }
         
          // Se não for um objeto, renderize como um campo normal
          return (
            <>
            
            <div key={key} className="mt-5 grid grid-cols-2 gap-3 items-center">
              
              <label htmlFor={key} className="text-base font-bold leading-6 text-blue-900">
                {key}:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id={key}
                  value={String(value || "")}
                  onChange={(e) => handleChange(key, e.target.value)}
                  style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                  className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                            text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                />
              </div>
            </div>
            </>
          );
        })}
    </div>
  );
}
