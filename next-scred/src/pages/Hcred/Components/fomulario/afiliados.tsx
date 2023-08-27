import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserSchema } from '../../../../lib/validationSchemas'
import { useEffect, useState } from 'react'
import { ApiAfiliados } from '../../../../types/Hred/types';
import { apipublic } from '@/services/apipublic'

const personalInfoSchema = createUserSchema.pick({
  afiliado: true,
  cidadeafiliado:true,
})

type CreateUserData = zod.infer<typeof personalInfoSchema> & { afiliadoId?: number};

interface FormularioAfiliadosProps{
  handleFormDataChangeAfiliados: (data:CreateUserData) => void,
  setValidateAndSave: React.Dispatch<React.SetStateAction<(() => Promise<boolean>) | null>>,
  formDataAfiliados: CreateUserData
}

export default function Afiliados({ handleFormDataChangeAfiliados,
                                    setValidateAndSave,
                                    formDataAfiliados}:FormularioAfiliadosProps){
  const [message, setMessage] = useState(''); 
  const [dadosAfiliadosApi, setDadosAfiliadosApi] = useState<ApiAfiliados[]>([]);
  const [ afiliadoSelecionados, setAfiliadoSelecionados] = useState<ApiAfiliados | null >(null); 
  const [ afiliadoFiltrado, setAfiliadoFiltrado] = useState<ApiAfiliados[]>([]); 
  const [ cidadeSelecionados, setCidadeSelecionados] = useState<string | null >(null); 

  const { 
    handleSubmit,
    register, 
    formState: {errors}, 
    getValues,
    trigger,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues:{
      //Colocar os valores default para cada campo.
      afiliado: formDataAfiliados ? formDataAfiliados.afiliado: '',
      cidadeafiliado: formDataAfiliados ? formDataAfiliados.cidadeafiliado: '',
    }
  });

  const validateAndSave = async () => {
    const isValid = await trigger();
    // Valida os campos
    if (isValid) {
      handleFormDataChangeAfiliados({ ...getValues()})
      return true;
    } else {
      return false;
      
    }
  };

  useEffect(() => {
    setValidateAndSave(() => validateAndSave);
  //eslint-disable-next-line
  },[]);

  async function createUser(data: CreateUserData) {
    try{
      setMessage("Dados enviados com sucesso.")
      handleFormDataChangeAfiliados(data);
    } catch (erro){
      console.error(erro)
      setMessage('Favor revisar os dados da solicitação')
    }
  }

  useEffect ( () => {
    apipublic.get('afiliados-publicos/')
      .then((res) => {
        setDadosAfiliadosApi(res.data);
      })
      .catch((error) => console.log(error))
      
  }, [])
  
  const handleAfiliadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cidade = e.target.value;
    setCidadeSelecionados(cidade);
    
    const afiliadosDaCidade = dadosAfiliadosApi.filter(afiliado => afiliado.cidade === cidade)
    setAfiliadoFiltrado(afiliadosDaCidade) 

  }

  const handleAfiliadoList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nomeSelecionado = e.target.value;
    const afiliadoCorrespondente = afiliadoFiltrado.find(afiliado => afiliado.nome === nomeSelecionado);
   
    setAfiliadoSelecionados(afiliadoCorrespondente ? afiliadoCorrespondente : null)

    const afiliadoId = afiliadoCorrespondente?.id
    handleFormDataChangeAfiliados({ ...getValues(), afiliadoId })
  }


  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(createUser)} action="">  
      <h2 className="text-lg font-semibold leading-7
                       text-gray-900 mt-10">
          Dados do Afiliado para acompanhamento do processo
        </h2>
      {/* Afiliados */}
      <div className="mt-5 gap-x-6 gap-y-8">
        <div className="sm:col-span-2">
          <div className="mt-2">
            <label htmlFor="estadolivro" className="block text-sm font-medium leading-6 text-gray-900">
              Cidade
            </label>
            <select
              id="afiliado"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('afiliado',)}
              onChange={handleAfiliadoChange}
            >
              <option>Selecione a cidade</option>
              {
                dadosAfiliadosApi.map(afiliado => (
                  <option key={afiliado?.id} value={afiliado?.cidade}>
                    {afiliado?.cidade}
                  </option>
                ))
              }
            </select>
            {errors.cidadeafiliado && (
              <p className="text-red-500 mt-2 text-sm">{errors.cidadeafiliado.message}</p>
            )}
          </div>

          <div className="mt-2">
            <label htmlFor="estadolivro" className="block text-sm font-medium leading-6 text-gray-900">
              Nome Afiliado
            </label>
            <select
              id="cidadeafiliado"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                         ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                         first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('cidadeafiliado',)}
              onChange={handleAfiliadoList}
            >
              <option>Selecione o afiliado</option>
              {
                afiliadoFiltrado.map( afiliado => (
                  <option key={afiliado?.id} value={afiliado?.nome}>{afiliado?.nome}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="mt-2">
            {afiliadoSelecionados ? (
              <>
              <div className="mt-6">
                <dl className="grid grid-cols-1 sm:grid-cols-3 ">
                  <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
                    <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Razão Social:</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{afiliadoSelecionados?.razao_social}</dd>
                  </div>
              <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">CNPJ:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{afiliadoSelecionados?.cnpj}</dd>
              </div>
              <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Telefone:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{afiliadoSelecionados?.telefone}</dd>
              </div>
              <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Endereço:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{afiliadoSelecionados?.endereco}</dd>
              </div>
              <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Bairro:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{afiliadoSelecionados?.bairro}</dd>
              </div>
              <div className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-roboto font-bold leading-6 text-gray-900">Estado:</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">{afiliadoSelecionados?.estado}</dd>
              </div>
          
            </dl>
      </div>
                  </>
                ) : (
                    <></>
                  )}
                  </div>
                  
                </div>
              </div>
      </form>

    </div>
  )
}
