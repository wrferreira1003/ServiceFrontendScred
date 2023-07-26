import { useState } from 'react'
import { TiTick } from "react-icons/ti";
import DadosPessoas from '../../Components/fomulario/DadosPessoas';
import HeaderService from '../../Components/headerService';
import EnderecoForm from '../../Components/fomulario/endereco';

interface FormularioDadosPessoal {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  
}
interface FormularioEndereco {
  estado: string;
  endereco: string;
  cidade: string;
  bairro: string;
  cep: string;
}   

export default function Tabelionato(){
  const [servico, setServico] = useState('');
  const [subservico, setSubServico] = useState('');
  const [validateAndSave, setValidateAndSave] = useState<(() => Promise<boolean>) | null>(null);
  
  const [formData, setFormData] = useState<FormularioDadosPessoal>({
    nome: '', 
    sobrenome: '', 
    email: '', 
    telefone: '',
  });
  const [formDataendereco, setFormDataendereco] = useState<FormularioEndereco>({
    estado: '',
    endereco: '',
    cidade: '',
    bairro: '',
    cep: '',
  });
  
  //stepper
  const steps = ["Informações básica", "Endereço", "Documentos", "Resumo", "Resumo"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const handleServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setServico(event.target.value);
  }
  const handleSubServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubServico(event.target.value);
    console.log(event.target.value);
  }

  //Funcao que recebe os dados dos componentes do formulario
  const handleFormDataChange = (newData: any) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData
    }));
    console.log('Dados pessoal');
    console.log(newData); // agora você pode ver os novos dados do formulário no console
  }
  //Funcao que recebe os dados dos componentes do formulario
  const handleFormDataChangeEndereco = (newData: any) => {
    setFormDataendereco(prevDataendereco => ({
      ...prevDataendereco,
      ...newData
    }));
    console.log('Endereco');
    console.log(newData); // agora você pode ver os novos dados do formulário no console
  }

  const combineDataForm = () => {
    const combinedData = {
      ...formData,
      ...formDataendereco
    }
    console.log(combinedData);
  };

  //Funcao que Comunica com os componentes de formulario e faz as validacoes 
  const handleNextClick = async () => {
    console.log('Clique no next');
      
    if (currentStep === steps.length) {
      setComplete(true);
      combineDataForm() //Chamando a funcao para juntar os dados.
    } else {
      //Verificando qual etapa
      if (currentStep === 1 && validateAndSave) {
        const isValid = await validateAndSave(); // Valida e salva os dados antes de avançar
        if (isValid) {
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 2 && validateAndSave) {
        console.log('Aqui colocaremos o formulario parte 2')
        const isValidEndereco = await validateAndSave();
        if (isValidEndereco) {
        setCurrentStep((prev) => prev + 1);
        }

      } else if (currentStep === 3){
      
        console.log('Aqui colocaremos o formulario parte 3')
        setCurrentStep((prev) => prev + 1);
      } else if (currentStep === 4){
      
        console.log('Aqui colocaremos o formulario parte 3')
        setCurrentStep((prev) => prev + 1);
      } else if (currentStep === 5){
      
        console.log('Aqui colocaremos o formulario parte 3')
        setCurrentStep((prev) => prev + 1);
      }

    }
  
  };
  
  return (
    <div className=" w-4/5 mx-auto">
      <HeaderService 
        handleServicoChange={handleServicoChange}
        handleSubServicoChange={handleSubServicoChange}
      /> 

      {(servico === 'Nova Solicitação' && subservico !== 'Tipo de Serviço') && (
        <div>   
          <div>
            <h2 className="text-lg font-semibold leading-7 text-gray-900 mt-10">
              Informações Para Solicitaçao de Consulta de Documentos</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
            Esta solicitação foi criada especificamente para os clientes que desejam solicitar 
            uma novo documentos em um determinado cartório. Por favor, tenha em mente que as informações requeridas para tal consulta 
            devem estar corretas e completas para garantir a precisão dos resultados
            </p>
          </div>

          <div className="flex flex-col w-full items-center justify-center mx-auto mt-10">
            <div className="flex justify-between">
              {steps?.map((step, i) => (
                <div
                  key={i}
                  className={`step-item ${currentStep === i + 1 && "active"} ${
                  (i + 1 < currentStep || complete) && "complete"
                  } `}
                >
                  <div className="step">
                    {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
                  </div>
                  <p className="text-gray-500">{step}</p>
                </div>
                  ))}
              </div>
              {currentStep === 1 && <DadosPessoas 
                                    formData={formData} 
                                    handleFormDataChange={handleFormDataChange}
                                    setValidateAndSave= {setValidateAndSave}
                                    />}
              {currentStep === 2 && <EnderecoForm 
                                      formDataendereco={formDataendereco} 
                                      handleFormDataChangeEndereco={handleFormDataChangeEndereco}
                                      setValidateAndSave= {setValidateAndSave}/>}
              {currentStep === 3 && ""}
              {currentStep === 4 && ""}
              {currentStep === 5 && ""}
                    
              {!complete && (
              <div className="btn-group flex gap-x-3 mb-5">
                {currentStep > 1 && (
                  <button
                    className="btn w-24 flex items-center justify-center text-center
                              focus:outline-none focus:ring-0"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                  > 
                    Voltar
                  </button>
                  )}
                  <button
                    className="btn w-24 flex items-center justify-center text-center"
                    onClick={handleNextClick}
                  >
                    {currentStep === steps.length ? "Finalizar" : "Avançar"}
                  </button>
              </div>
              
              )}
            </div>
          </div>
          )}
          
        {/* Solicitacao de consulta */}
        {(servico === 'Solicitação de Consulta' && subservico !== 'Tipo de Serviço') && (
           <div>
            <div>
              <h2 className="text-lg font-semibold leading-7 text-gray-900 mt-10">
                Informações Para Solicitaçao de Consulta de Documentos</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
              Esta solicitação foi criada especificamente para os clientes que desejam realizar 
              uma consulta de documentos em um determinado cartório. Por favor, tenha em mente que as informações requeridas para tal consulta 
              devem estar corretas e completas para garantir a precisão dos resultados
              </p>
            </div>

            <div className="flex flex-col w-full items-center justify-center mx-auto mt-10">            
              <div className="flex justify-between">
                {steps?.map((step, i) => (
                  <div
                    key={i}
                    className={`step-item ${currentStep === i + 1 && "active"} ${
                    (i + 1 < currentStep || complete) && "complete"
                    } `}
                  >
                    <div className="step">
                      {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
                    </div>
                    <p className="text-gray-500">{step}</p>
                  </div>
                    ))}
                </div>
                {currentStep === 1 && <DadosPessoas 
                                      formData={formData} 
                                      handleFormDataChange={handleFormDataChange}
                                      setValidateAndSave= {setValidateAndSave}
                                      />}
                {currentStep === 2 && ""}
                {currentStep === 3 && ""}
                {currentStep === 4 && ""}
                {currentStep === 5 && ""}
                      
                {!complete && (
                <div className="btn-group flex gap-x-3 mb-5">
                  {currentStep > 1 && (
                    <button
                      className="btn w-24 flex items-center justify-center text-center
                                focus:outline-none focus:ring-0"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                    > 
                      Voltar
                    </button>
                    )}
                    <button
                      className="btn w-24 flex items-center justify-center text-center"
                      onClick={handleNextClick}
                    >
                      {currentStep === steps.length ? "Finalizar" : "Avançar"}
                    </button>
                </div>
                )}
              </div>
            </div>


            )}
          </div> 
             
  )}