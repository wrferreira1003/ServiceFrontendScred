import { useContext, useState } from "react";
import LoadingIndicator from "@/componentesGeral/LoadingIndicator";
import EnviarFormularioModal from "@/componentesGeral/enviarFormularioModal";
import TipoDeEntrega from "@/componentesGeral/fomulario/TipodeEntrega";
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
import DadosDoRegistro from "@/componentesGeral/fomulario/NovosPequenosComponents/dadosDoRegistro";
import BuscaTipoRegistro from "@/componentesGeral/fomulario/NovosPequenosComponents/BuscaTipoRegistro";
import { ConsolidadoServicos } from "@/types/TodosServicos";
import moment from "moment";
import { toast } from "react-toastify";
import TextAreaComponents from "@/componentesGeral/fomulario/NovosPequenosComponents/TextAreaComponets";
import CartorioAutenticacao from "@/componentesGeral/fomulario/NovosPequenosComponents/cartorioReconhecimento";

const notificationMethods = ConsolidadoServicos.filter(
  method => method.id === 'CertidaoNascimento' || method.categoria === 'Certidão de Casamento'
);

export default function CertidaoCasamento() {
  
  const [validateAndSave, setValidateAndSave] = useState<(() => Promise<boolean>) | null>(null);
  const [validateAndSaveSolicitante, setValidateAndSaveSolicitante] = useState<(() => Promise<boolean>) | null>(null);
  const [validateAndSaveDtCasamento, setValidateAndSaveDtCasamento] = useState<(() => Promise<boolean>) | null>(null);
  
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

  const [formDataEntrega, setFormDataendereco] = useState<FormularioDadosEntrega>(formDataDadosEntrega);
  
  const [formDataCartorio, setformDataCartorio] = useState<FormularioCartorio>(formDataCartorioType);

  const [formDataDadosRegistro, setformDataDadosRegistro] = useState<FormularioDadosRegistro>(formDataDadosRegistroType);

  //stepper
  const steps = [
    "Solicitação",
    "Dados Pessoal",
    "Cartório",
    "Dados do Registro",
    "Observação",
    "Tipo de Entrega",
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
 
  //Recebe os dados de cartorio
  const handleFormDataChangeCartorio = (newData: any) => {
    setformDataCartorio((prevDataCartorio) => ({
      ...prevDataCartorio,
      ...newData,
    }));
  };
  //
  const handleFormDataDadosRegistro = (newData: any) => {
    setformDataDadosRegistro((prevDataDadosRegistro) => ({
      ...prevDataDadosRegistro,
      ...newData,
    }));
  };

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
        
        Cartorio: formDataCartorio.cartorio,
        "Cidade do Cartório": formDataCartorio.cidadeCartorio,
        "Estado do Cartório": formDataCartorio.estadoCartorio,
        
        Livro:formDataDadosRegistro.livro,
        Folha: formDataDadosRegistro.folha,
        Termo: formDataDadosRegistro.termo,
        
        "Tipo de Entrega":formDataEntrega.option,
        
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
  const handleSendApi = async () => {
    setIsLoading(true); 
    const combinedData = {
          nome: formData.nome,
          cpf: formData.cpf,
          email: formData.email,
          telefone: formData.telefone,
          
          conjugue1: formDataConjugue?.conjugue1,
          conjugue2: formDataConjugue?.conjugue2,

          data_casamento: moment(formDataDtCasamento.DtCasamento, "DD/MM/YYYY").format(
            "YYYY-MM-DD",
          ),
          
          nomeCartorio: formDataCartorio.cartorio,
          cidadeCartorio: formDataCartorio.cidadeCartorio,
          estadoCartorio: formDataCartorio.estadoCartorio,
          
          livroCartorio:formDataDadosRegistro.livro,
          folhaCartorio: formDataDadosRegistro.folha,
          termo: formDataDadosRegistro.termo,
          
          tipoDeEntrega:formDataEntrega.option,

          servico: servicosSelecionados?.id,
     
          afiliado: user?.user_type !== 'AFILIADO' ? userCliente?.afiliado : user?.id,
          FormaDePagamento:paymentMethod,

          Observacoes: comentComponets
      };
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
      else if (currentStep === 2 && validateAndSave && validateAndSaveSolicitante && validateAndSaveDtCasamento) {
        const isValid = await validateAndSave();
        const isValidSolicitante = await validateAndSaveSolicitante(); // Valida e salva os dados antes de avançar
        const isValidDtNascimento = await validateAndSaveDtCasamento()
        if (isValid && isValidSolicitante && isValidDtNascimento) {
          onNextStep();
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 3 && validateAndSave) {
        const isValidCartorio = await validateAndSave(); // Chame a função que valida Cartorio
        if (isValidCartorio) {
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 4 && validateAndSave) {
        const isValidDocumentos = await validateAndSave();
        if (isValidDocumentos) {
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 5 && validateAndSave) {
        setCurrentStep((prev) => prev + 1);

      } else if (currentStep === 6 && validateAndSave) {
        const isValidCartorio = await validateAndSave(); // Chame a função que valida Cartorio
        if (isValidCartorio) {
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 7 && validateAndSave) {
        setCurrentStep((prev) => prev + 1);
        
      } else if (currentStep === 8) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };


  return (
    <div>
      <div>
        <h2 className="mt-10 text-2xl font-semibold leading-7 text-blue-800">
        {servicosSelecionados?.nome_servico ? servicosSelecionados.nome_servico : 'Certidão de Casamento'}
        </h2>
        <p className="mt-1 text-sm leading-5 text-gray-600">
          
        A certidão de casamento é um serviço essencial que oficializa 
        a união civil entre duas pessoas, garantindo-lhes o direito de reconhecimento 
        perante a lei. Esse documento é a principal prova da união e é indispensável 
        para diversos trâmites ao longo da vida conjugal.
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
        {currentStep === 3 && (
          <CartorioAutenticacao
          handleFormDataChangeCartorio={handleFormDataChangeCartorio}
          formDataCartorio={formDataCartorio}
          setValidateAndSave={setValidateAndSave}
        />
        )}

        {currentStep === 4 && (
          <>
            <DadosDoRegistro
              handleFormDataDadosRegistro={handleFormDataDadosRegistro}
              formDataDadosRegistro={formDataDadosRegistro}
              setValidateAndSave={setValidateAndSave}
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
          <TipoDeEntrega
          handleFormDataChangeEntrega={handleFormDataChangeEntrega}
          setValidateAndSave={setValidateAndSave}
          />
        )}

        {currentStep === 7 && (
          <>
            {" "}
            <ComponetsResumo
              data={combinedData}
            />
          </>
       )}

        {currentStep === 8 && (
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