import { useContext, useState } from "react";
import LoadingIndicator from "@/componentesGeral/LoadingIndicator";
import EnviarFormularioModal from "@/componentesGeral/enviarFormularioModal";
import TipoDeEntrega from "@/componentesGeral/fomulario/TipodeEntrega";
import { AuthContext } from "@/context/AuthContext";
import { apipublic } from "@/services/apipublic";
import CarrinhoComponent from "@/pages/carrinho/components/carrinho";
import { AuthUserContext } from "@/context/AuthUserContext";
import DadosSolicitanteComponents, { CreateUserDataSolicitante } from "@/componentesGeral/fomulario/NovosPequenosComponents/dadosSolicitante";
import { DadosSolicitanteType, DtInicialFinalType, formDataCartorioType, formDataDadosEntrega, formDataDadosRegistroType } from "@/types/Adm/formularios";
import { FormularioCartorio, FormularioDadosEntrega, FormularioDadosRegistro, ServicoType } from "@/types/Adm/types";
import ComponetsResumo from "../components/ComponentsResumo";
import BuscaTipoRegistro from "@/componentesGeral/fomulario/NovosPequenosComponents/BuscaTipoRegistro";
import BannerInformeComponents from "@/componentesGeral/BannerInformes";
import DataInicialFinal, { CreateUserDataInicialFinal } from "@/componentesGeral/fomulario/NovosPequenosComponents/DtInicialFinal";
import moment from "moment";
import TermoCondicoes from "@/componentesGeral/TermoCondicoes";
import RecadoSolicitacao from "./components/recadoComponet";
import { ConsolidadoServicos } from "@/types/TodosServicos";
import TextAreaComponents from "@/componentesGeral/fomulario/NovosPequenosComponents/TextAreaComponets";
import CartorioAutenticacao from "@/componentesGeral/fomulario/NovosPequenosComponents/cartorioReconhecimento";

const notificationMethods = ConsolidadoServicos.filter(
  method => method.id === 'CertidaoNascimento' || method.categoria === 'Busca Registro'
)

export default function BuscaRegistro() {

  const [validateAndSave, setValidateAndSave] = useState<(() => Promise<boolean>) | null>(null);
  const [validateAndSaveSolicitante, setValidateAndSaveSolicitante] = useState<(() => Promise<boolean>) | null>(null);
  const [validateAndSaveDtInicialFinal, setValidateAndSaveDtInicialFinal] = useState<(() => Promise<boolean>) | null>(null);

  const [notification, setNotification] = useState("");
  

  const [isDisable, setIsDisable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const {dataServicoAtual, user, dataServico} = useContext(AuthContext)
  const {userCliente} = useContext(AuthUserContext)
  //Componente Dados Solicitante
  const [formData, setFormData] = useState<CreateUserDataSolicitante>(DadosSolicitanteType);

  const [formDataEntrega, setFormDataendereco] = useState<FormularioDadosEntrega>(formDataDadosEntrega);
  
  const [formDataCartorio, setformDataCartorio] = useState<FormularioCartorio>(formDataCartorioType);
  const [formDataDadosRegistro, setformDataDadosRegistro] = useState<FormularioDadosRegistro>(formDataDadosRegistroType);
  //Componente Datas Inicial e Final
  const [formDataInicialFinal, setFormDataInicialFinal] = useState<CreateUserDataInicialFinal>(DtInicialFinalType);
  //Resgatar a marcacao do termos e condicoes
  const [isTermAccepted, setIsTermAccepted] = useState(false);

  //stepper
  const steps = [
    "Tipo de registro",
    "Cartório",
    "Identificação",
    "Data do registro",
    "Observação",
    "Tipo de Entrega",
    "Resumo",
    "Carrinho"
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
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

  const handleTermChange = (isChecked: boolean) => {
    setIsTermAccepted(isChecked);
  };

  //Funcao que recebe os dados Pessoas
  const handleFormDataChange = (newData: any) => {
    setFormData((prevData: any) => ({
    ...prevData,
    ...newData,
    }));
  };

  //Funcao que recebe a data inicial e final
  const handleFormDataChangeDataInicialFinal = (newData: any) => {
    setFormDataInicialFinal((prevData: any) => ({
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
        "Serviço Solicitado": servicosSelecionados?.nome_servico,
        
        "Nome Completo": formData.nome,
         CPF: formData.cpf,
         EMAIL: formData.email,
         TEL: formData.telefone,
  
        "Estado do Cartório": formDataCartorio.estadoCartorio,
        "Cidade do Cartório": formDataCartorio.cidadeCartorio,
         Cartorio: formDataCartorio.cartorio,

        'Data Inicial': moment(formDataInicialFinal.Dtinicial,"YYYY-MM-DD").format("DD/MM/YYYY",),
        'Data Final': moment(formDataInicialFinal.Dtfinal,"YYYY-MM-DD").format("DD/MM/YYYY",),
 
        "Tipo de Entrega":formDataEntrega.option,

        //Caso a condicao nao seja verdadeira o campo nao aparece
        ... (user?.user_type !== 'AFILIADO' ? { "Nome Afiliado": user?.nome } : {}),
        
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
          telefone: formData.telefone,
          email: formData.email,
 
          data_inicial: formDataInicialFinal.Dtinicial,
          data_final: formDataInicialFinal.Dtfinal,

          //SEgunda parte
          nomeCartorio: formDataCartorio.cartorio,
          cidadeCartorio: formDataCartorio.cidadeCartorio,
          estadoCartorio: formDataCartorio.estadoCartorio,
          tipoDeEntrega:formDataEntrega.option,

          servico: servicosSelecionados?.id,
     
          afiliado: user?.user_type !== 'AFILIADO' ? userCliente?.afiliado : user?.id,
          FormaDePagamento:paymentMethod,

          Observacoes: comentComponets,
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
      if (currentStep === 1) {
        if (notification) {
          onNextStep();
          setCurrentStep((prev) => prev + 1);
        }else{
          alert("Por favor, selecione uma opção")
        }
      } else if (currentStep === 2 && validateAndSave) {
        const isValidCartorio = await validateAndSave(); // Chame a função que valida Cartorio
        if (isValidCartorio) {
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 3 && validateAndSaveSolicitante) {
        const isValidSolicitante = await validateAndSaveSolicitante();
        if (isValidSolicitante) {
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 4 && validateAndSaveDtInicialFinal) {
        const isValidDtInicialFinal = await validateAndSaveDtInicialFinal(); // Chame a função que valida Cartorio
        if (isValidDtInicialFinal) {
          setCurrentStep((prev) => prev + 1);
        }
      
      } else if (currentStep === 5 && validateAndSave) {
        setCurrentStep((prev) => prev + 1);

      } else if (currentStep === 6 && validateAndSave) {
        const isValidCartorio = await validateAndSave(); // Chame a função que valida Cartorio
        if (isValidCartorio) {
          setCurrentStep((prev) => prev + 1);
        }
        
      } else if (currentStep === 7 && isTermAccepted) {
   
          setCurrentStep((prev) => prev + 1);
        
      } else if (currentStep === 8) {
      setCurrentStep((prev) => prev + 1);
    }
    }
  };

  //Função do botao para voltar.
  function handleBackButtonClick() {
    setCurrentStep((prev) => prev - 1);
    setNotification("")
  }

  return (
    <div>
      <div>
        <h2 className="mt-10 text-2xl font-semibold leading-7 text-blue-800">
        {servicosSelecionados?.nome_servico ? servicosSelecionados.nome_servico : 'Buscar Registro'}
        </h2>
    
      </div>

      <div className="mx-auto mb-2 mt-5 flex flex-col  justify-center rounded-md bg-slate-100 p-5">
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
            <RecadoSolicitacao/>
            <BuscaTipoRegistro
            onNotificationChange = {handleNotification}
            methods={notificationMethods}
            />     
          </>
        )}
        
        {currentStep === 2 && (
          <>
          <BannerInformeComponents
            texto="Todos os campos são obrigatórios"
            />

          <CartorioAutenticacao
          handleFormDataChangeCartorio={handleFormDataChangeCartorio}
          formDataCartorio={formDataCartorio}
          setValidateAndSave={setValidateAndSave}
        />
          </>
        )}

        {currentStep === 3 && (
          <>

            <BannerInformeComponents
            texto="Informe os dados de apenas um dos cônjuges"
            />
    
            
            <DadosSolicitanteComponents
              formData={formData}
              handleFormDataChange={handleFormDataChange}
              setValidateAndSaveSolicitante={setValidateAndSaveSolicitante}
            />
          </>
        )}
        
        {currentStep === 4 && (
          <>
            <BannerInformeComponents
              texto="Todos os campos são obrigatórios"
            />

            <DataInicialFinal
              formData={formDataInicialFinal}
              handleFormDataChange={handleFormDataChangeDataInicialFinal}
              setValidateAndSaveDtInicialFinal={setValidateAndSaveDtInicialFinal}
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

          <TermoCondicoes 
          name= "terms"
          validation={{
            required: "Você deve concordar com os termos para continuar."
            }}
          onCheckedChange= {handleTermChange}
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
                onClick={handleBackButtonClick}
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