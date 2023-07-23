import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

//Realizar as validacoes dos dados aqui.
const createUserSchema = zod.object({
  nome: zod.string().nonempty({
    message: 'O Nome é obrigatório',
  }).min(3,{
    message: 'O Nome precisa ter no mínimo 3 caracteres'
  }),

  sobrenome: zod.string().nonempty({
    message: 'O Sobrenome é obrigatório',
  }).min(3,{
    message: 'O Sobrenome precisa ter no mínimo 3 caracteres'
  }),

  email: zod.string().nonempty({
    message: 'O Email é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  }),
  telefone: zod.string().refine(value => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(value);
  }, {
    message:'Número de telefone inválido, o formato correto é (XX) XXXXX-XXXX',
  }),

  estado: zod.string().nonempty({
    message: 'Selecione o Estado',
  }),

  endereco: zod.string().nonempty({
    message: 'Preencher o endereço',
  }),

  cidade: zod.string().nonempty({
    message: 'Preencha com o nome da cidade',
  }),

  bairro: zod.string().nonempty({
    message: 'Preencha com o nome do Bairro',
  }),
  cep: zod.string().refine(value => {
    const regex = /^[0-9]{5}-[0-9]{3}$/;
    return regex.test(value);
  }, {
    message:'CEP inválido, o formato correto é 00000-000',
  }),
  rg: zod.string().nonempty({
    message: 'O RG é obrigatório',
  }),
  
  cpf: zod
    .string()
    .nonempty('CPF não pode ser vazio')
    .refine(
      cpf => cpf.length === 11,
    {message: 'CPF precisa ter apenas números'}
  ),
  fileUpload: zod.any(), // ou você pode encontrar um validador apropriado

  mensagem: zod.string(),
  
  afiliado: zod
    .string()
    .refine(value => value !== 'Selecione um afiliado', {
    message: 'Selecione um afiliado',
  }),

  cidadeafiliado: zod
    .string()
    .refine(value => value !== 'Selecione uma cidade', {
    message: 'Selecione uma cidade',
  }),

});

//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof createUserSchema>

export default function FormularioSolicitacao(){
  
  
  const [message, setMessage] = useState('');
  const router = useRouter();
  
  const handleCancel = () => {
    router.push('/')
  }
  const { 
    handleSubmit,
    register, 
    formState: {errors}, 
    watch,
    control,
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
    defaultValues:{
      //Colocar os valores default para cada campo.
    }
  });

  async function createUser(data: CreateUserData) {
    try{
      const files = data.fileUpload
      for (let i = 0; i < files.length; i++) {
        console.log(data)
      }
      setMessage("Dados enviados com sucesso.")
    } catch (erro){
      console.error(erro)
      setMessage('Favor revisar os dados da solicitação')
    }
  }


  return(
    <form onSubmit={handleSubmit(createUser)} action="">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold leading-7 text-gray-900 mt-10">Informações Para Nova Solicitaçao de Documento</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use um endereço permanente onde você possa receber correspondência.</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            {/* Campo Nome */}
            <div className="sm:col-span-3">
              <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                Primeiro Nome
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="nome"
                  placeholder='Digite seu nome'
                  className="block w-full rounded-md border-0 py-1.5 px-1
                             text-gray-900 shadow-sm ring-1 ring-inset 
                             ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                             focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('nome')}
                />
                    {errors.nome && (
                      <p className="text-red-500 mt-2 text-sm">{errors.nome.message}</p>
                    )}

              </div>
            </div>
            
            {/* Campo Sobrenome */}
            <div className="sm:col-span-3">
              <label htmlFor="sobrenome" className="block text-sm font-medium leading-6 text-gray-900">
                Sobrenome
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="sobrenome"
                  placeholder='Digite seu sobrenome'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-1
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('sobrenome')}
                />
                {errors.sobrenome && (
                      <p className="text-red-500 mt-2 text-sm">{errors.sobrenome.message}</p>
                    )}
              </div>
            </div>
            
            {/* Campo email */}
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder='Digite seu email'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('email')}
                />
                {errors.email && (
                      <p className="text-red-500 mt-2 text-sm">{errors.email.message}</p>
                    )}
              </div>
            </div>

            {/* Campo Telefone */}
            <div className="sm:col-span-3">
              <label htmlFor="telefone" className="block text-sm font-medium leading-6 text-gray-900">
                Telefone
              </label>
              <div className="mt-2">
                <input
                  id="telefone"
                  type="telefone"
                  placeholder='(XX) XXXXX-XXXX'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('telefone')}
                />
                {errors.telefone && (
                      <p className="text-red-500 mt-2 text-sm">{errors.telefone.message}</p>
                    )}
              </div>
            </div>

            {/* Campo Endereço */}
            <div className="col-span-full">
              <label htmlFor="endereco" className="block text-sm font-medium leading-6 text-gray-900">
                Endereço (Rua, Quadra, Lote ou Número)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="endereco"
                  placeholder='Rua x, Lote ou Número: x, Quadra: Y, Complemento'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('endereco')}
                />
                {errors.endereco && (
                      <p className="text-red-500 mt-2 text-sm">{errors.endereco.message}</p>
                    )}
              </div>
            </div>

            {/* Campo Estado */}
            <div className="sm:col-span-3">
              <label htmlFor="estado" className="block text-sm font-medium leading-6 text-gray-900">
              Estado 
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="estado"
                  placeholder='Digite seu Estado'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-1
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('estado')}
                />
                {errors.estado && (
                      <p className="text-red-500 mt-2 text-sm">{errors.estado.message}</p>
                    )}
              </div>
            </div>
                    
            {/* Campo Cidade */}
            <div className="sm:col-span-3">
              <label htmlFor="cidade" className="block text-sm font-medium leading-6 text-gray-900">
                Cidade
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="cidade"
                  placeholder='Digite a sua Cidade'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('cidade')}
                />
                {errors.cidade && (
                      <p className="text-red-500 mt-2 text-sm">{errors.cidade.message}</p>
                    )}
              </div>
            </div>
            
            {/* Campo Bairro */}
            <div className="sm:col-span-3">
              <label htmlFor="bairro" className="block text-sm font-medium leading-6 text-gray-900">
                Bairro
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="bairro"
                  placeholder='Digite seu bairro'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('bairro')}
                />
                {errors.bairro && (
                      <p className="text-red-500 mt-2 text-sm">{errors.bairro.message}</p>
                    )}
              </div>
            </div>

            {/* Campo CEP */}
            <div className="sm:col-span-3">
              <label htmlFor="cep" className="block text-sm font-medium leading-6 text-gray-900">
                Cep
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="cep"
                  placeholder='00000-00'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2   
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('cep')}
                />
                {errors.cep && (
                      <p className="text-red-500 mt-2 text-sm">{errors.cep.message}</p>
                    )}
              </div>
            </div>
          </div>

          {/* Campo de mensagem */}
          <div className="col-span-full">
            <div className="mt-10">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Deixe uma Mensagem
              </label>
              <textarea
                id="mensagem"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                          focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                defaultValue={''}
                {...register('mensagem')}
              />
            </div>
          </div>
            
            {/* Campo para  Digitar os doxumentos */}
            <div className="border-b border-gray-900/10 pb-12"></div>
              <h2 className="text-lg font-semibold leading-7 text-gray-900 mt-10">
                Documentação Obrigatória
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Os documentos informado precisa ser do cliente solicitante do serviço.
              </p>

            {/* Campo de Identidade */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="rg" className="block text-sm font-medium leading-6 text-gray-900">
                    Identidade
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="rg"
                      placeholder='Digite seu RG'
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('rg')}
                    />
                    {errors.rg && (
                      <p className="text-red-500 mt-2 text-sm">{errors.rg.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                    CPF
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="cpf"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('cpf')}
                      />
                      {errors.cpf && (
                      <p className="text-red-500 mt-2 text-sm">{errors.cpf.message}</p>
                    )}
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Campo de upload */}
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Documentação : Anexar documentos como RG, CPF ou CNH, comprovante de endereço de todas as partes envolvidas no processo.
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 
                              focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 
                              focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Enviar Documentos</span>
                    <input 
                      id="file-upload" 
                      multiple
                      type="file" 
                      className="sr-only" 
                      {...register('fileUpload')}
                    />
                  </label>
                  <p className="pl-1">Carregar um arquivo ou arraste e solte</p>
                </div>
                  <p className="text-xs leading-5 text-gray-600">PDF, PNG, JPG, GIF up to 25MB</p>
              </div>          
            </div>

              {/* Campo para  selecionar o afiliados */}
            <div className="border-b border-gray-900/10 pb-12"></div>
              <h2 className="text-lg font-semibold leading-7 text-gray-900 mt-10">
                Selecione um afiliado mais proximo de você.
              </h2>

            {/* Afiliados */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="cidade-afiliado" className="block text-sm font-medium leading-6 text-gray-900">
                    Cidade
                  </label>
                  <div className="mt-2">
                    <select
                      id="cidade-afiliado"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('cidadeafiliado')}
                      >
                        <option>Selecione uma cidade</option>
                        <option>Rio de Janeiro</option>
                        <option>Nitéroi</option>
                        <option>Marica</option>
                      </select>
                      {errors.cidadeafiliado && (
                      <p className="text-red-500 mt-2 text-sm">{errors.cidadeafiliado.message}</p>
                    )}
                    </div>
                  </div>
      

                <div className="sm:col-span-2">
                  <label htmlFor="afiliado" className="block text-sm font-medium leading-6 text-gray-900">
                    Afiliado
                  </label>
                  <div className="mt-2">
                    <select
                      id="afiliado"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                 first-letter:first-line:marker:selection:focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('afiliado')}
                      >
                        <option>Selecione um afiliado</option>
                        <option>047 - Rio de Janeiro</option>
                        <option>048 - Nitéroi</option>
                        <option>049 - Marica</option>
                      </select>
                      {errors.afiliado && (
                      <p className="text-red-500 mt-2 text-sm">{errors.afiliado.message}</p>
                    )}
                  </div>
                  
                </div>
              </div>
         
              <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" 
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={handleCancel}
              >
                Cancelar
              </button>
                
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm
                          hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                          focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar
              </button>
            </div> 
            {message && <p className="mt-2 ml-2 text-green-500 text-right">{message}</p>} 
          </div> 
    </form>
  )
}