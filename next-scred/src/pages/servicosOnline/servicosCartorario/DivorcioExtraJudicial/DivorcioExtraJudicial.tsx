import { useContext, useState } from "react";
import LoadingIndicator from "@/componentesGeral/LoadingIndicator";
import EnviarFormularioModal from "@/componentesGeral/enviarFormularioModal";
import { AuthContext } from "@/context/AuthContext";
import ComponetsResumo from "../../components/ComponentsResumo";
import { apipublic } from "@/services/apipublic";
import CarrinhoComponent from "@/pages/carrinho/components/carrinho";
import { AuthUserContext } from "@/context/AuthUserContext";
import DadosSolicitanteComponents, { CreateUserDataSolicitante } from "@/componentesGeral/fomulario/NovosPequenosComponents/dadosSolicitante";
import DataCasamentoComponent, { CreateUserDataDtCasamento } from "@/componentesGeral/fomulario/NovosPequenosComponents/DtCasamento";
import DadosConjugueCasamento, { CreateUserDataConjugue } from "@/componentesGeral/fomulario/NovosPequenosComponents/conjugueComponets";
import { DadosSolicitanteType, formDataCartorioType, formDataDadosEntrega, formDataDadosRegistroType } from "@/types/Adm/formularios";
import { DadosConjugueType, DadosDtCasamentoType, FormularioCartorio, FormularioDadosEntrega, FormularioDadosRegistro, ServicoType } from "@/types/Adm/types";
import BuscaTipoRegistro from "@/componentesGeral/fomulario/NovosPequenosComponents/BuscaTipoRegistro";
import { ConsolidadoServicos } from "@/types/TodosServicos";
import moment from "moment";
import { toast } from "react-toastify";
import TextAreaComponents from "@/componentesGeral/fomulario/NovosPequenosComponents/TextAreaComponets";
import DivorcioComponets, { CreateUserDataDovorcio } from "@/componentesGeral/fomulario/NovosPequenosComponents/DivorcioComponents";
import EstadoCidadeComponet, { CreateUserDataCidade } from "@/componentesGeral/fomulario/NovosPequenosComponents/EstadoCidade";
import UploadDocumentos from "@/componentesGeral/fomulario/uploadDocumentos/uploadDocumentos";
import { FileData, combineData } from "@/types/Hred/types";
import BannerInformeComponents from "@/componentesGeral/BannerInformes";

const notificationMethods = ConsolidadoServicos.filter(
  method => method.id === 'CertidaoNascimento' || method.categoria === 'Divórcio extrajudicial'
);

export default function DivorcioExtraJudicial() {
  
  const [validateAndSave, setValidateAndSave] = useState<(() => Promise<boolean>) | null>(null);
  const [validateAndSaveSolicitante, setValidateAndSaveSolicitante] = useState<(() => Promise<boolean>) | null>(null);
  const [validateAndSaveDtCasamento, setValidateAndSaveDtCasamento] = useState<(() => Promise<boolean>) | null>(null);
  const [validateAndSaveDivorcio, setValidateAndSaveDivorcio] = useState<(() => Promise<boolean>) | null>(null);
  const [validateAndSaveCidadeEstado, setValidateAndSaveCidadeEstado] = useState<(() => Promise<boolean>) | null>(null);

  const [fileState, setFileState] = useState<FileData[]>([]);
  const [isDisable, setIsDisable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const {dataServico, user} = useContext(AuthContext)
  const {userCliente} = useContext(AuthUserContext)
  //Componente Dados Solicitante
  const [formData, setFormData] = useState<CreateUserDataSolicitante>(DadosSolicitanteType);
  //Componente Dados Solicitante
  const [formDataConjugue, setformDataConjugue] = useState<CreateUserDataConjugue>(DadosConjugueType);
  //Componente Dados Solicitante
  const [formDataDtCasamento, setFormDataDtCasamento] = useState<CreateUserDataDtCasamento>(DadosDtCasamentoType);

  //Componente Dados Divorcio
  const [formDataDivorcio, setFormDataDivorcio] = useState<CreateUserDataDovorcio>({
    temFilhosMenores: '',
    temBens: '' ,
    filhoIncapaz: ''
  }); 
  
  const [formEstadoCidade, setFormEstadoCidade] = useState<CreateUserDataCidade>({
    estado: '',
    cidade: '' ,
  });  

  const [formDataEntrega, setFormDataendereco] = useState<FormularioDadosEntrega>(formDataDadosEntrega);
  
  const [formDataCartorio, setformDataCartorio] = useState<FormularioCartorio>(formDataCartorioType);

  const [formDataDadosRegistro, setformDataDadosRegistro] = useState<FormularioDadosRegistro>(formDataDadosRegistroType);

  //stepper
  const steps = [
    "Solicitação",
    "Solicitante",
    "Divorciando",
    "Adicionais",
    "Observação",
    "Resumo",
    "Carrinho"
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [notification, setNotification] = useState("");
  const [comentComponets, setComentComponets] = useState("");
  const [servicosSelecionados, setServicosSelecionados] = useState<ServicoType | null>(null);

  //trago o sevico selecionado e filtro conforme todos os servicos no banco de dados
  const handleNotification = (value: string) => {
    setNotification(value);
    const servicoFiltrado = dataServico.find(servico => servico.nome_servico === value)
    if(servicoFiltrado){
      setServicosSelecionados(servicoFiltrado)
    } 
  }
   //trago o comentario na abertura da soliitacao
   const handleComentComponent = (value: string) => {
    setComentComponets(value);
  }

  //Funcao que recebe os dados Pessoas
  const handleFormDataChange = (newData: any) => {
    setFormData((prevData: any) => ({
    ...prevData,
    ...newData,
    }));
  };

   //Funcao que recebe os dados Divorcio
   const handleFormDataChangeDivorcio = (newData: any) => {
    setFormDataDivorcio((prevData: any) => ({
    ...prevData,
    ...newData,
    }));
  };

  //Funcao que recebe os dados Cidade e Estado
  const handleFormDataChangeCidadeEstado = (newData: any) => {
    setFormEstadoCidade((prevData: any) => ({
    ...prevData,
    ...newData,
    }));
  };
  

  //Funcao que recebe os dados dos Conjugue
  const handleFormDataChangeAfiliacao = (newData: any) => {
    setformDataConjugue((prevData: any) => ({
    ...prevData,
    ...newData,
    }));
  };
    //Funcao que recebe os dados Dt Casamento
    const handleFormDataChangeDtNascimento = (newData: any) => {
      //Convertendo newData.nascimento de string para Date, se existe
      if (newData.DtCasamento) {
        newData.DtCasamento = new Date(newData.DtCasamento);
      }
      setFormDataDtCasamento((prevData) => ({
        ...prevData,
        ...newData,
      }));
    };

   //Funcao que recebe os dados dos componentes do formulario de entrega
   const handleFormDataChangeEntrega = (newData: any) => {
    setFormDataendereco((prevDataendereco) => ({
      ...prevDataendereco,
      ...newData,
    }));
  };

  //Funcao que trata os uploads
  const handleFilesChange = (files: any) => {
    const newFilesArray: FileData[] = Object.values(files);
    setFileState((prevDataUpload) => {
      const uniqueFiles = [...prevDataUpload];
      newFilesArray.forEach((newFile) => {
        if (!prevDataUpload.some((prevFile) => prevFile.id === newFile.id)) {
          uniqueFiles.push(newFile);
        }
      });
      return uniqueFiles;
    });
  };

  //Funcao para Remover um arquivo
  const removeFile = (indexToRemove: number) => {
    setFileState((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(indexToRemove, 1);
      return updatedFiles;
    });
  }

  //Dados preparado para ser enviado ao resumo
  const combineDataForm = () => {
    return {
        Nome: formData.nome,
        CPF: formData.cpf,
        EMAIL: formData.email,
        TELEFONE: formData.telefone,
        "Data casamento": moment(formDataDtCasamento.DtCasamento, "YYYY-MM-DD").format(
          "DD/MM/YYYY",
        ),
        "Nome do primeiro cônjugue": formDataConjugue?.conjugue1,
        "Nome do segundo cônjugue": formDataConjugue?.conjugue2,
        
        "Cidade": formEstadoCidade.cidade,
        "Estado": formEstadoCidade.estado,

        "Tem Filhos Menores": formDataDivorcio.temFilhosMenores,
        "Tem Bens Partilhar": formDataDivorcio.temBens,
        "Tem Filhos Incapaz": formDataDivorcio.filhoIncapaz,
        
        //Caso a condicao nao seja verdadeira o campo nao aparece
        ... (user?.user_type !== 'AFILIADO' ? { "Nome Afiliado": user?.nome } : {}),

        "Serviço Solicitado": servicosSelecionados?.nome_servico,
        "Valor do Serviço": servicosSelecionados?.preco,
        
        ... (comentComponets !== null ? { "Observações": comentComponets } : {}),
    };
    
  };

  //Salvando a funcao para enviar ao Resumo.
  const combinedData = combineDataForm()

  //Funcao que resgata o tipo de pagamento do componete carrinho
  const handleSelectedPaymentMethod = (paymentMethod: any) => {
    setPaymentMethod(paymentMethod)
  }

  //Funcao para enviar os dados ao Servidor
  const handleSendApi = () => {
    setIsLoading(true); 
    const combinedData: combineData = {
          nome: formData.nome,
          cpf: formData.cpf,
          email: formData.email,
          telefone: formData.telefone,
          
          conjugue1: formDataConjugue?.conjugue1,
          conjugue2: formDataConjugue?.conjugue2,

          data_casamento: moment(formDataDtCasamento.DtCasamento, "DD/MM/YYYY").format(
            "YYYY-MM-DD",
          ),
          
          cidade: formEstadoCidade.cidade,
          estado: formEstadoCidade.estado,
          
          temFilhosMenores:formDataDivorcio.temFilhosMenores,
          temBens: formDataDivorcio.temBens,
          filhoIncapaz: formDataDivorcio.filhoIncapaz,

          servico: servicosSelecionados?.id ? String(servicosSelecionados.id) : null,
     
          afiliado: user?.user_type !== 'AFILIADO' ? userCliente?.afiliado : user?.id,
          FormaDePagamento:paymentMethod,

          Observacoes: comentComponets,

          documentos: [],
      };

      fileState.forEach((fileobj, index) => {
        combinedData.documentos.push({
          arquivo: fileobj.file,
          descricao: fileobj.name,
        });        
      });
      
      const formDataToSend = new FormData();

    //Preparando o que nao é documentos para ter a chave e valor.
    Object.keys(combinedData).forEach((key) => {
      if (key !== "documentos") {
        formDataToSend.append(key, combinedData[key]);
      } else {
        combinedData.documentos.forEach((documento, index) => {
          formDataToSend.append(
            `documentos[${index}].descricao`,
             documento.descricao,
          );
          formDataToSend.append(
            `documentos[${index}].arquivo`,
            documento.arquivo,
          );
        });
      }
    });

    const sendDataToServer = async (formDataToSend: any) => {
    
      try { 
        const response = await apipublic.post("criar_cliente/", combinedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        //console.log("Dados enviados com sucesso:", response.data);
        setIsLoading(false);
        setShowModal(true);
        return response.data;
      } catch (error) {
        console.error("Erro ao enviar os dados");
        setIsLoading(false);
        toast.error('Erro ao enviar os dados');
        throw error;
      }
  };
  sendDataToServer(formDataToSend)
      .then((data) => {
        //console.log("Dados recebidos:");
        // Faça algo após receber uma resposta bem-sucedida, como mostrar uma mensagem de sucesso.
      })
      .catch((error) => {
        //console.error("Erro ao enviar os dados:");
        // Faça algo em caso de erro, como mostrar uma mensagem de erro.
      });
  };
  //----------------------------------------------------------------
 
  const onNextStep = () => {
    setIsDisable(true);
  };
  //Funcao que Comunica com os componentes de formulario e faz as validacoes
  const handleNextClick = async () => {
    if (currentStep === steps.length) {
      setComplete(true);
      setIsLoading(true);
      handleSendApi(); //Chamando a funcao para juntar os dados.
    } else {
      //Verificando qual etapa
      if (currentStep === 1){
        if (notification) {
          onNextStep();
          setCurrentStep((prev) => prev + 1);
        }else{
          alert("Por favor, selecione uma opção")
        }
      
      }
      else if (currentStep === 2 && validateAndSaveSolicitante) {
        const isValidSolicitante = await validateAndSaveSolicitante()
        if (isValidSolicitante) {
          onNextStep();
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 3 && validateAndSave && validateAndSaveDtCasamento) {
        ; // Valida e salva os dados antes de avançar
        const isValidDtNascimento = await validateAndSaveDtCasamento()
        const isValidConjuges = await validateAndSave()
        if (isValidConjuges && isValidDtNascimento) {
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 4 && validateAndSaveDivorcio && validateAndSaveCidadeEstado) {
        const isValidDivorcio = await validateAndSaveDivorcio();
        const isValidCidadeEstado = await validateAndSaveCidadeEstado();
        if (isValidDivorcio && isValidCidadeEstado) {
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 5 && validateAndSave) {
        setCurrentStep((prev) => prev + 1);

      } else if (currentStep === 6 && validateAndSave) {
        setCurrentStep((prev) => prev + 1);
        
      } else if (currentStep === 7) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };


  return (
    <div>
      <div>
        <h2 className="mt-10 text-2xl font-semibold leading-7 text-blue-800">
        {servicosSelecionados?.nome_servico ? servicosSelecionados.nome_servico : 'Divorcio Extra Judicial'}
        </h2>
        <p className="mt-1 text-sm leading-5 text-gray-600">
          
        O divórcio extrajudicial é uma maneira mais simples e rápida de dissolver 
        um casamento, sem a necessidade de processo judicial. 
        </p>
      </div>

      <div className="mx-auto mb-2 mt-10 flex flex-col justify-center rounded-md bg-slate-100 p-5">
        <div className="mt-5 flex flex-col items-center justify-center sm:flex-row">
          {steps?.map((step, i) => (
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                (i + 1 < currentStep || complete) && "complete"
              } `}
            >
              <div className="step">
                {i + 1 < currentStep || complete
                  ? /*<Check size={32} />*/ ""
                  : i + 1}
              </div>
              <p className="text-gray-500">{step}</p>
            </div>
          ))}
        </div>
        <div>
        <BannerInformeComponents
            texto="Caso seja Divorcio Judicial, Por Favor, Chamar no WhatsApp."
            />
        </div>
        {currentStep === 1 && (
          <>
           <BuscaTipoRegistro
            onNotificationChange = {handleNotification}
            methods={notificationMethods}
            />     
          </>
        )}
        {currentStep === 2 && (
          <>
            <DadosSolicitanteComponents
              formData={formData}
              handleFormDataChange={handleFormDataChange}
              setValidateAndSaveSolicitante={setValidateAndSaveSolicitante}
            />


           
          </>
        )}
        {currentStep === 3 && (
          <>
            <DadosConjugueCasamento 
              formData={formDataConjugue}
              handleFormDataChange={handleFormDataChangeAfiliacao}
              setValidateAndSave={setValidateAndSave}
            />
            <DataCasamentoComponent
              formData={formDataDtCasamento}
              handleFormDataChange={handleFormDataChangeDtNascimento}
              setValidateAndSave={setValidateAndSaveDtCasamento}
            />
          </>
        )}

        {currentStep === 4 && (
          <>
            <DivorcioComponets
              formData={formDataDivorcio}
              handleFormDataChange={handleFormDataChangeDivorcio}
              setValidateAndSave={setValidateAndSaveDivorcio}
            />

            <EstadoCidadeComponet
              formDataCidade={formEstadoCidade}
              handleFormDataChange={handleFormDataChangeCidadeEstado}
              setValidateAndSave={setValidateAndSaveCidadeEstado} />
            
            <UploadDocumentos
              onFilesChange={handleFilesChange}
              filesState={fileState}
              removeFile={removeFile}
            
            />
          </>
        )}

        {currentStep === 5 && (
          <>
            <TextAreaComponents
              onComentChange = {handleComentComponent}
              servico={servicosSelecionados?.nome_servico}
            />
          </>
        )}

        {currentStep === 6 && (
          <>
            {" "}
            <ComponetsResumo
              data={combinedData}
            />
          </>
       )}

        {currentStep === 7 && (
           <>
           {" "}
           <CarrinhoComponent
            id={servicosSelecionados?.id}
            servico={servicosSelecionados?.nome_servico}
            valor={servicosSelecionados?.preco}
            formaEntrega = {formDataEntrega?.option}
            onSelectPaymentMethod = {handleSelectedPaymentMethod}
           
           />
         </>
       )}
   
        {isLoading && <LoadingIndicator />}
        {showModal && (
          <EnviarFormularioModal onClose={() => setShowModal(false)} />
        )}

        {!complete && (
          <div className="btn-group mb-5 flex gap-x-3 justify-between">
            {currentStep > 1 && (
              <button
                className="btn flex w-24 items-center justify-center text-center
                              focus:outline-none focus:ring-0"
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                Voltar
              </button>
            )}
            <button
              className="btn flex w-24 items-center justify-center text-center"
              onClick={handleNextClick}
            >
              {currentStep === steps.length ? "Finalizar" : "Avançar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}