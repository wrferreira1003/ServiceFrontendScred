export default function RecadoSolicitacao(){
  return(
    <div className="mt-10">
        <label className="text-base font-semibold text-gray-900">Tipo de registro</label>
        <p className="text-sm text-gray-500 mb-5">
        Selecione o registro que você deseja buscar
        </p>
        <div className="bg-blue-100 px-2 py-4 rounded-lg">
          <p className="text-sm">
            Só poderão ser realizadas buscas de registros online utilizando-se da base
            da central de informações de registro civil (CRC) nos seguintes estado:
          </p>
          <div className="text-sm mt-5">
          <div>
            <span className="ml-5 font-bold">São Paulo: </span><span>registros a partir de 1967</span>
          </div>
          <div>
            <span className="ml-5 font-bold">Pernambuco: </span><span>registros a partir de 1976</span>
          </div>
        </div>
      </div>
    </div>
  )
}