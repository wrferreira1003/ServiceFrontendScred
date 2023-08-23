import { useState } from 'react'
import Afiliados from "./fomulario/afiliados";
import EnderecoForm from "./fomulario/endereco";
import DadosPessoasReconhecimentoFirma from './fomulario/DadosPessoasreconhecimentoFirma';
import FormDocumentosSimples from './fomulario/documentoSimples';
import { useServico } from '../../../context/servicocontext';
import LoadingIndicator from '../../../componentesGeral/LoadingIndicator';
import moment from 'moment';

import { 
  FormularioEndereco,
  FormularioAfiliados,
  FileData,
  combineData,
 } from './NovoServicoGeral';
import CartorioAutenticacao from './fomulario/cartorioReconhecimento';
import UploadDocumentos from './fomulario/uploadDocumentos/uploadDocumentos';
import ResumoAfiliados from './fomulario/Resumo/resumoAfiliado';
import ResumoDadosReconhecimento from './fomulario/Resumo/resumoDadosReconhecimento';
import ResumoCartorioReconhecimento from './fomulario/Resumo/resumoCartorioReconhecimento';
import EnviarFormularioModal from './enviarFormularioModal';
import ResumoUploadDocumentos from './fomulario/Resumo/resumoUploadDocumentos';
import { api } from '@/services/api';

export interface FormularioDadosReconhecimentoFirma{
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  estadocivil: string;
  profissao: string;
  nascimento: string; 
}
export interface FormularioDadosDocumentos{
  rg: string;
  cpf: string;
}

export interface FormularioCartorio{
  cartorio: string;
  cidadeCartorio: string;
  estadoCartorio: string;
}

export default function ReconhecimentoSemelhanca(){

  const [validateAndSave, setValidateAndSave] = useState<(() => Promise<boolean>) | null>(null);
  const [isDisable, setIsDisable] = useState(false);
  const [fileState, setFileState] = useState<FileData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { servico, subservico } = useServico();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormularioDadosReconhecimentoFirma>({
    nome: '', 
    sobrenome: '', 
    email: '', 
    telefone: '',
    estadocivil: '',
    profissao: '', 
    nascimento: '',
  });
  const [formDataendereco, setFormDataendereco] = useState<FormularioEndereco>({
    estado: '',
    endereco: '',
    cidade: '',
    bairro: '',
    cep: '',
  });

  const [formDataDocumentos, setFormDataDocumentos] = useState<FormularioDadosDocumentos>({
    rg: '',
    cpf: '',
  });

  const [formDataCartorio, setformDataCartorio] = useState<FormularioCartorio>({
    cartorio: '',
    cidadeCartorio: '',
    estadoCartorio: '',
  });

  const [formDataAfiliados, setformDataAfiliados] = useState<FormularioAfiliados>({
    cidadeafiliado: '',
    afiliado: '',
    afiliadoId: 0,
  });

  //stepper
  const steps = ["Dados Pessoal", "Endereço", "Documentos", "Cartório", "Afiliado", "Resumo"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  //Funcao que recebe os dados dos componentes do formulario
  const handleFormDataChange = (newData: any) => {
    // Convertendo newData.nascimento de string para Date, se existe
    if (newData.nascimento) {
      newData.nascimento = new Date(newData.nascimento);
    }
    
    setFormData(prevData => ({
      ...prevData,
      ...newData,
    }));
  }
  
  //Funcao que recebe os dados dos componentes do formulario de endereco
  const handleFormDataChangeEndereco = (newData: any) => {
    setFormDataendereco(prevDataendereco => ({
      ...prevDataendereco,
      ...newData
    }));
  }
  //Funcao que recebe os dados dos componentes documento
  const handleFormDataChangeDocumentos = (newData: any) => {
    setFormDataDocumentos(prevDataDocumentos => ({
      ...prevDataDocumentos,
      ...newData
    }))
  };
  const handleFormDataChangeCartorio = (newData: any) => {
    setformDataCartorio(prevDataCartorio => ({
      ...prevDataCartorio,
      ...newData
    }))
  }
  //Funcao que recebe os dados dos componentes Afiliado
  const handleFormDataChangeAfiliados = (newData: any) => {
    setformDataAfiliados(prevDataAfiliados => ({
      ...prevDataAfiliados,
      ...newData
    }))
  }

  const handleFilesChange = (files: any) => {
    const newFilesArray: FileData[] = Object.values(files);
    setFileState(prevDataUpload => {
        const uniqueFiles = [...prevDataUpload];
        newFilesArray.forEach(newFile => {
            if (!prevDataUpload.some(prevFile => prevFile.id === newFile.id)) {
                uniqueFiles.push(newFile);
            }
        });
        return uniqueFiles;
    });
  };

  const removeFile = (indexToRemove: number) => {
    setFileState(prevFiles => {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(indexToRemove, 1);
        return updatedFiles;
    });
  }


  const combineDataForm = () => {
    const combinedData:combineData = {
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      email:formData.email,
      telefone:formData.telefone,
      RegistroGeral:formDataDocumentos.rg,
      cpf: formDataDocumentos.cpf,
      estado_civil: formData.estadocivil,
      profissao: formData.profissao,
      data_nascimento: moment(formData.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      estado: formDataendereco.estado,
      endereco:formDataendereco.endereco,
      cidade:formDataendereco.cidade,
      bairro:formDataendereco.bairro,
      cep:formDataendereco.cep,
      afiliado: formDataAfiliados.afiliadoId,
      servico: servico,
      subservico: subservico,
      nomeEnvolvido: '',
      sobrenomeEnvolvido:'',
      RegistroGeralEnvolvido: '',
      cpfEnvolvido: '',

      nomeCartorio:'',
      estadoCartorio:'',
      livroCartorio:'',
      folhaCartorio:'',

      nomeCartorioFirmaReconhecida:formDataCartorio.cartorio,
      estadoCartorioFirmaReconhecida:formDataCartorio.estadoCartorio,
      livroCartorioFirmaReconhecida:formDataCartorio.cidadeCartorio,
      
      documentos: []
    }
    
    fileState.forEach((fileobj, index) =>{
      combinedData.documentos.push({
        arquivo: fileobj.file,
        descricao: fileobj.name
      });
    });

    const formDataToSend = new FormData();

    //Preparando o que nao é documentos para ter a chave e valor.
    Object.keys(combinedData).forEach((key) => {
      if (key !== 'documentos') {
        formDataToSend.append(key, combinedData[key]);
      } else {
        combinedData.documentos.forEach((documento, index) => {
          console.log(`documentos[${index}].descricao:`, documento.descricao);
          console.log(`documentos[${index}].arquivo:`, documento.arquivo);
          formDataToSend.append(`documentos[${index}].descricao`, documento.descricao);
          formDataToSend.append(`documentos[${index}].arquivo`, documento.arquivo);
        });
      }
    });
  
    const sendDataToServer = async (formDataToSend: any) => {
      setIsLoading(true)
      try {
          const response = await api.post('criar_cliente/', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });

        console.log('Dados enviados com sucesso:', response.data);
        setIsLoading(false);
        setShowModal(true);
        return response.data;
      } catch (error) {
        console.error('Erro ao enviar os dados');
        throw error;
        
      }
    };
    
    sendDataToServer(formDataToSend)
      .then(data => {
        console.log('Dados recebidos:');
        // Faça algo após receber uma resposta bem-sucedida, como mostrar uma mensagem de sucesso.
      })
      .catch(error => {
        console.error('Erro ao enviar os dados:');
        setIsLoading(false);
        // Faça algo em caso de erro, como mostrar uma mensagem de erro.
      });
  };

  const onNextStep = () => {
    setIsDisable(true);
  };
  //Funcao que Comunica com os componentes de formulario e faz as validacoes 
  const handleNextClick = async () => {      
    if (currentStep === steps.length) {
      setComplete(true);
      setIsLoading(true);
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

  return(

    <div>   
          <div>
            <h2 className="text-lg font-semibold leading-7 text-gray-900 mt-10">
              Reconhecimento de Firma por Semelhança</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
            O Reconhecimento de Firma por Semelhança é um procedimento jurídico que confirma a 
            autenticidade de uma assinatura em um documento. No processo, o tabelião compara a 
            assinatura no documento com a original registrada em arquivo, atestando a autenticidade 
            se forem semelhantes.
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
              
              {currentStep === 1 && <DadosPessoasReconhecimentoFirma
                                      formData={formData} 
                                      handleFormDataChange = {handleFormDataChange}
                                      setValidateAndSave = {setValidateAndSave}
                                    />}
              {currentStep === 2 && <EnderecoForm 
                                      formDataendereco={formDataendereco} 
                                      handleFormDataChangeEndereco={handleFormDataChangeEndereco}
                                      setValidateAndSave= {setValidateAndSave}/>}
              
              {currentStep === 3 && <><FormDocumentosSimples 
                                     formDataDocumentos={formDataDocumentos}
                                     handleFormDataChangeDocumentos={handleFormDataChangeDocumentos}
                                     setValidateAndSave= {setValidateAndSave}   
                                    />
                                    
                                    < UploadDocumentos onFilesChange={handleFilesChange}
                                                      filesState = {fileState}
                                                      removeFile = {removeFile}
                                    />
                                    
                                    </>}
              
              {currentStep === 4 &&   <CartorioAutenticacao
                                          handleFormDataChangeCartorio= {handleFormDataChangeCartorio}
                                          formDataCartorio= {formDataCartorio}
                                          setValidateAndSave= {setValidateAndSave}
                                      />}
              
              {currentStep === 5 &&   <Afiliados
                                          handleFormDataChangeAfiliados = {handleFormDataChangeAfiliados} 
                                          setValidateAndSave = {setValidateAndSave}
                                          formDataAfiliados = {formDataAfiliados}
                                        />}
                                      

              {currentStep === 6 && <>    < ResumoDadosReconhecimento 
                                                          InfoPessoal = {formData} 
                                                          Documentos = {formDataDocumentos}
                                                          Endereco = {formDataendereco}
                                           />
                                           
                                           < ResumoCartorioReconhecimento 
                                                          Cartorio = {formDataCartorio}
                                           />
                                            <ResumoAfiliados
                                                          Afiliados = {formDataAfiliados}
                                            />
                                            < ResumoUploadDocumentos 
                                                          fileState = {fileState}/>
                                      </>}  
              {isLoading && <LoadingIndicator/>}
              {showModal && <EnviarFormularioModal onClose={() => setShowModal(false)} />}
              
              
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
      
  )
}