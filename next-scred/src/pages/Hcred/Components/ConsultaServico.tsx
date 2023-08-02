import { useState } from 'react'
import ResumoForm from './fomulario/resumoform';
import Afiliados from './fomulario/afiliados';
import DadosCartorio from './fomulario/dadosCartorio';
import FormDocumentos from './fomulario/documentos';
import EnderecoForm from './fomulario/endereco';
import DadosPessoas from './fomulario/DadosPessoas';

import { FormularioDadosPessoal,
         FormularioEndereco,
         FormularioDocumentos,
         FormularioAfiliados,
         FormularioCartorio,
        } from './NovoServicoGeral';
import UploadDocumentos from './fomulario/uploadDocumentos';
//import { Check } from '@phosphor-icons/react';

export default function ConsultaServico(){
  const [servico, setServico] = useState('');
  const [subservico, setSubServico] = useState('');
  const [validateAndSave, setValidateAndSave] = useState<(() => Promise<boolean>) | null>(null);
  const [isDisable, setIsDisable] = useState(false);

  const [formData, setFormData] = useState<FormularioDadosPessoal>({
    nome: '', 
    sobrenome: '', 
    email: '', 
    telefone: '',
    nomeenvolvido: '',
    sobrenomeenvolvido: '', 
  });
  const [formDataendereco, setFormDataendereco] = useState<FormularioEndereco>({
    estado: '',
    endereco: '',
    cidade: '',
    bairro: '',
    cep: '',
  });

  const [formDataDocumentos, setFormDataDocumentos] = useState<FormularioDocumentos>({
    rg: '',
    cpf: '',
    rgenvolvido: '',
    cpfenvolvido: '',
    fileUpload: '',
  });

  const [formDataAfiliados, setformDataAfiliados] = useState<FormularioAfiliados>({
    cidadeafiliado: '',
    afiliado: '',
  });
  const [formDataCartorio, setformDataCartorio] = useState<FormularioCartorio>({
    cartorio: '',
    estadolivro: '',
    livro: '',
    folha: '',
  });
  
  //stepper
  const steps = ["Dados Pessoal", "Endereço", "Documentos", "Cartório","Afiliado", "Resumo"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);


  //Funcao que recebe os dados dos componentes do formulario
  const handleFormDataChange = (newData: any) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData
    }));
  }
  //Funcao que recebe os dados dos componentes do formulario
  const handleFormDataChangeEndereco = (newData: any) => {
    setFormDataendereco(prevDataendereco => ({
      ...prevDataendereco,
      ...newData
    }));
  }

  const handleFormDataChangeDocumentos = (newData: any) => {
    setFormDataDocumentos(prevDataDocumentos => ({
      ...prevDataDocumentos,
      ...newData
    }))
  };

  const handleFormDataChangeAfiliados = (newData: any) => {
    setformDataAfiliados(prevDataAfiliados => ({
      ...prevDataAfiliados,
      ...newData
    }))
  }

  const handleFormDataChangeCartorio = (newData: any) => {
    setformDataCartorio(prevDataCartorio => ({
      ...prevDataCartorio,
      ...newData
    }))
  }

  const combineDataForm = () => {
    const combinedData = {
      servico,
      subservico,
      ...formData,
      ...formDataendereco,
      ...formDataDocumentos,
      ...formDataAfiliados,
      ...formDataCartorio
    }
    console.log(combinedData);
  };

  const onNextStep = () => {
    setIsDisable(true);
  };
  //Funcao que Comunica com os componentes de formulario e faz as validacoes 
  const handleNextClick = async () => {      
    if (currentStep === steps.length) {
      setComplete(true);
      combineDataForm() //Chamando a funcao para juntar os dados.
    } else {
      //Verificando qual etapa
      if (currentStep === 1 && validateAndSave) {
        const isValid = await validateAndSave(); // Valida e salva os dados antes de avançar
        if (isValid) {
          onNextStep()
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 2 && validateAndSave) {
        const isValidEndereco = await validateAndSave();
        if (isValidEndereco) {
        setCurrentStep((prev) => prev + 1);
        }

      } else if (currentStep === 3 && validateAndSave) {
        const isValidDocumentos = await validateAndSave();
        if (isValidDocumentos) {
        setCurrentStep((prev) => prev + 1);
        }

      } else if (currentStep === 4 && validateAndSave) {
          const isValidCartorio = await validateAndSave(); // Chame a função que valida Cartorio
          if (isValidCartorio) {
            setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 5 && validateAndSave) {
        const isValidAfiliados = await validateAndSave(); // Validação de Afiliados sempre ocorre
          if (isValidAfiliados) {
          setCurrentStep((prev) => prev + 1);
      }

      } else if (currentStep === 6){      
        console.log('Aqui colocaremos o formulario parte 3')
        setCurrentStep((prev) => prev + 1);
      }
    }
  };
  
  return (
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

            <div className="bg-slate-100 flex flex-col p-3 rounded-md items-center justify-center mx-auto mt-10 mb-2">
              <div className="flex flex-col sm:flex-row items-center justify-center mt-5">
                {steps?.map((step, i) => (
                  <div
                    key={i}
                    className={`step-item ${currentStep === i + 1 && "active"} ${
                    (i + 1 < currentStep || complete) && "complete"
                    } `}
                  >
                    <div className="step">
                      {i + 1 < currentStep || complete ? /*<Check size={32} />*/ '' : i + 1}
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
              {currentStep === 3 && 
                                    <>
                                    <FormDocumentos 
                                     formDataDocumentos={formDataDocumentos}
                                     handleFormDataChangeDocumentos={handleFormDataChangeDocumentos}
                                     setValidateAndSave= {setValidateAndSave}   
                                    />
                                    < UploadDocumentos />
                                    </>}
              
              {currentStep === 4 && < DadosCartorio
                                        handleFormDataChangeCartorio= {handleFormDataChangeCartorio}
                                        formDataCartorio= {formDataCartorio}
                                        setValidateAndSave= {setValidateAndSave}
                                        />}

              {currentStep === 5 &&  <Afiliados
                                          handleFormDataChangeAfiliados = {handleFormDataChangeAfiliados} 
                                          setValidateAndSave = {setValidateAndSave}
                                          formDataAfiliados = {formDataAfiliados}
                                        />}

              {currentStep === 6 && < ResumoForm />}
                      
        

                {!complete && (
                <div className="btn-group flex gap-x-3 mb-5">
                  {currentStep > 1 && (
                    <button
                      className="btn w-24 flex items-center justify-center text-center
                                focus:outline-none focus:ring-0"
                      onClick={() => setCurrentStep((prev) => prev - 1) 
                      }
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