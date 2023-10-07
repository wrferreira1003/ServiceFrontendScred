import { useContext, useState } from "react";
import moment from "moment";
import CartorioAutenticacao from "@/componentesGeral/fomulario/cartorioReconhecimento";
import LoadingIndicator from "@/componentesGeral/LoadingIndicator";
import EnviarFormularioModal from "@/componentesGeral/enviarFormularioModal";
import DadosPessoasCertidao from "@/componentesGeral/fomulario/DadosPessoasCertidao";
import TipoDeEntrega from "@/componentesGeral/fomulario/TipodeEntrega";
import DadosDoRegistro from "@/componentesGeral/fomulario/dadosDoRegistro";
import { AuthContext } from "@/context/AuthContext";
import ComponetsResumo from "../../components/ComponentsResumo";
import { useRouter } from 'next/router';
import { apipublic } from "@/services/apipublic";
import CarrinhoComponent from "@/pages/carrinho/components/carrinho";


interface DadosCarrinho {
  id: number | undefined;
  servico: string | undefined;
  valor: string | undefined; // Assumindo que 'preco' é uma string. Caso contrário, altere o tipo conforme necessário.
}

export interface FormularioDadosPessoal {
  nome: string
  email: string
  sobrenome: string
  cpf: string
  nascimento: string
  filiacao1: string
  filiacao2: string
  telefone: string
  telefone2:string
  cep:string
  cidade: string
  estado: string
  bairro: string
  numero: string
  complemento: string
  logradouro: string
}

export interface FormularioDadosEntrega {
  option: string;
}

export interface FormularioCartorio {
  cartorio: string;
  cidadeCartorio: string;
  estadoCartorio: string;
}
export interface FormularioDadosRegistro {
  livro: string;
  folha: string;
  termo: string;
}

export default function CertidaoNascimento() {
  const router = useRouter()
  const [validateAndSave, setValidateAndSave] = useState<
    (() => Promise<boolean>) | null
  >(null);
  const [isDisable, setIsDisable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const {dataServicoAtual, user} = useContext(AuthContext)
  const [formData, setFormData] = useState<FormularioDadosPessoal>({
    nome: "",
    email: "",
    sobrenome: "",
    cpf: "",
    nascimento: "",
    filiacao1: "",
    filiacao2: "",
    telefone: "",
    telefone2:"",
    cep:"",
    cidade: "",
    estado: "",
    bairro: "",
    numero: "",
    complemento: "",
    logradouro: "",

  });
  const [formDataEntrega, setFormDataendereco] = useState<FormularioDadosEntrega>({
    option: "",
  });
  
  const [formDataCartorio, setformDataCartorio] = useState<FormularioCartorio>({
    cartorio: "",
    cidadeCartorio: "",
    estadoCartorio: "",
  });

  const [formDataDadosRegistro, setformDataDadosRegistro] = useState<FormularioDadosRegistro>({
    livro: "",
    folha: "",
    termo: "",
  });

  //stepper
  const steps = [
    "Dados Pessoal",
    "Cartório",
    "Dados do Registro",
    "Tipo de Entrega",
    "Resumo",
    "Carrinho"
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  //Funcao que recebe os dados Pessoas
  const handleFormDataChange = (newData: any) => {
    // Convertendo newData.nascimento de string para Date, se existe
    if (newData.nascimento) {
      newData.nascimento = new Date(newData.nascimento);
    }
    setFormData((prevData) => ({
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
        Email:formData.email,
        CPF: formData.cpf,
        Nascimento: moment(formData.nascimento, "DD/MM/YYYY").format(
          "YYYY-MM-DD",
        ),
        Cartorio: formDataCartorio.cartorio,
        "Cidade do Cartório": formDataCartorio.cidadeCartorio,
        "Estado do Cartório": formDataCartorio.estadoCartorio,
        Livro:formDataDadosRegistro.livro,
        Folha: formDataDadosRegistro.folha,
        Termo: formDataDadosRegistro.termo,
        "Tipo de Entrega":formDataEntrega.option,
        "Nome Afiliado": user?.nome,
        "Serviço Solicitado": dataServicoAtual?.nome_servico,
        "Valor do Serviço": dataServicoAtual?.preco
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
          email: formData.email,
          cpf: formData.cpf,
          data_nascimento: moment(formData.nascimento, "DD/MM/YYYY").format(
            "YYYY-MM-DD",
          ),
          telefone: formData.telefone,
          telefone2: formData.telefone2,
          cep: formData.cep,
          estado: formData.estado,
          logradouro: formData.logradouro,
          bairro: formData.bairro,
          cidade: formData.cidade,
          complemento: formData.complemento,
          numero: formData.numero,
          
          nomeCartorio: formDataCartorio.cartorio,
          cidadeCartorio: formDataCartorio.cidadeCartorio,
          estadoCartorio: formDataCartorio.estadoCartorio,
          livroCartorio:formDataDadosRegistro.livro,
          folhaCartorio: formDataDadosRegistro.folha,
          termo: formDataDadosRegistro.termo,
          tipoDeEntrega:formDataEntrega.option,

          servico: dataServicoAtual?.id,
     
          afiliado: user?.id,
          FormaDePagamento:paymentMethod
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
      if (currentStep === 1 && validateAndSave) {
        const isValid = await validateAndSave(); // Valida e salva os dados antes de avançar
        if (isValid) {
          onNextStep();
          setCurrentStep((prev) => prev + 1);
        }
      } else if (currentStep === 2 && validateAndSave) {
        const isValidCartorio = await validateAndSave(); // Chame a função que valida Cartorio
        if (isValidCartorio) {
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
        setCurrentStep((prev) => prev + 1);
        
      } else if (currentStep === 6) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  return (
    <div>
      <div>
        <h2 className="mt-10 text-lg font-semibold leading-7 text-gray-900">
          Certidão de Nascimento
        </h2>
        <p className="mt-1 text-sm leading-5 text-gray-600">
          
          A emissão de certidão de nascimento é um serviço essencial que oficializa a existência 
          civil do indivíduo, garantindo-lhe o direito à identidade. Esse documento é a primeira prova da 
          cidadania e é indispensável para diversos trâmites ao longo da vida.
        </p>
      </div>

      <div className="mx-auto mb-2 mt-10 flex flex-col items-center justify-center rounded-md bg-slate-100 p-3">
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
          <DadosPessoasCertidao
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            setValidateAndSave={setValidateAndSave}
          />
        )}
        {currentStep === 2 && (
          <CartorioAutenticacao
          handleFormDataChangeCartorio={handleFormDataChangeCartorio}
          formDataCartorio={formDataCartorio}
          setValidateAndSave={setValidateAndSave}
        />
        )}

        {currentStep === 3 && (
          <>
            <DadosDoRegistro
              handleFormDataDadosRegistro={handleFormDataDadosRegistro}
              formDataDadosRegistro={formDataDadosRegistro}
              setValidateAndSave={setValidateAndSave}
            />
          </>
        )}

        {currentStep === 4 && (
          <TipoDeEntrega
          handleFormDataChangeEntrega={handleFormDataChangeEntrega}
          setValidateAndSave={setValidateAndSave}
          />
        )}

        {currentStep === 5 && (
           <>
           {" "}
           <ComponetsResumo
             data={combinedData}
      
           />
         </>
       )}
        {currentStep === 6 && (
           <>
           {" "}
           <CarrinhoComponent
            id={dataServicoAtual?.id}
            servico={dataServicoAtual?.nome_servico}
            valor={dataServicoAtual?.preco}
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
          <div className="btn-group mb-5 flex gap-x-3">
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