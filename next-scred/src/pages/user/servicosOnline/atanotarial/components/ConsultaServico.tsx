import { useContext, useState } from "react";
import { api } from "@/services/api";
import { FileData, FormularioAfiliados, FormularioCartorio, FormularioDadosPessoal, FormularioDocumentos, FormularioEndereco, combineData } from "@/pages/user/servicosOnline/atanotarial/components/NovoServicoGeral";
import EnviarFormularioModal from "@/componentesGeral/enviarFormularioModal";
import { useServico } from "@/context/servicocontext";
import DadosPessoas from "@/componentesGeral/fomulario/DadosPessoas";
import EnderecoForm from "@/componentesGeral/fomulario/endereco";
import FormDocumentos from "@/componentesGeral/fomulario/documentos";
import UploadDocumentos from "@/componentesGeral/fomulario/uploadDocumentos/uploadDocumentos";
import DadosCartorio from "@/componentesGeral/fomulario/dadosCartorio";
import Afiliados from "@/componentesGeral/fomulario/afiliados";
import ResumoDadosPessoas from "@/componentesGeral/fomulario/Resumo/resumoDadosPessoas";
import ResumoDadosEnvolvido from "@/componentesGeral/fomulario/Resumo/resumoDadosEnvolvidos";
import ResumoCartorio from "@/componentesGeral/fomulario/Resumo/resumoCartorio";
import ResumoAfiliados from "@/componentesGeral/fomulario/Resumo/resumoAfiliado";
import ResumoUploadDocumentos from "@/componentesGeral/fomulario/Resumo/resumoUploadDocumentos";
import LoadingIndicator from "@/componentesGeral/LoadingIndicator";
import { AuthUserContext } from "@/context/AuthUserContext";
import { toast } from "react-toastify";

export default function ConsultaServico() {
  const {userCliente} = useContext(AuthUserContext)
  const { servico, subservico } = useServico();
  const [validateAndSave, setValidateAndSave] = useState<
    (() => Promise<boolean>) | null
  >(null);
  const [isDisable, setIsDisable] = useState(false);
  const [fileState, setFileState] = useState<FileData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormularioDadosPessoal>({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    nomeenvolvido: "",
    sobrenomeenvolvido: "",
  });
  const [formDataendereco, setFormDataendereco] = useState<FormularioEndereco>({
    estado: "",
    endereco: "",
    cidade: "",
    bairro: "",
    cep: "",
  });

  const [formDataDocumentos, setFormDataDocumentos] =
    useState<FormularioDocumentos>({
      rg: "",
      cpf: "",
      rgenvolvido: "",
      cpfenvolvido: "",
      fileUpload: "",
    });

  const [formDataAfiliados, setformDataAfiliados] =
    useState<FormularioAfiliados>({
      cidadeafiliado: "",
      afiliado: "",
      afiliadoId: 0,
    });

  const [formDataCartorio, setformDataCartorio] = useState<FormularioCartorio>({
    cartorio: "",
    estadolivro: "",
    livro: "",
    folha: "",
  });

  //stepper
  const steps = [
    "Dados Pessoal",
    "Endereço",
    "Documentos",
    "Cartório",
    "Afiliado",
    "Resumo",
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  //Funcao que recebe os dados dos componentes do formulario
  const handleFormDataChange = (newData: any) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };
  //Funcao que recebe os dados dos componentes do formulario
  const handleFormDataChangeEndereco = (newData: any) => {
    setFormDataendereco((prevDataendereco) => ({
      ...prevDataendereco,
      ...newData,
    }));
  };

  const handleFormDataChangeDocumentos = (newData: any) => {
    setFormDataDocumentos((prevDataDocumentos) => ({
      ...prevDataDocumentos,
      ...newData,
    }));
  };

  const handleFormDataChangeAfiliados = (newData: any) => {
    setformDataAfiliados((prevDataAfiliados) => ({
      ...prevDataAfiliados,
      ...newData,
    }));
  };

  const handleFormDataChangeCartorio = (newData: any) => {
    setformDataCartorio((prevDataCartorio) => ({
      ...prevDataCartorio,
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
  };

  const handleSendApi = () => {
    const combinedData: combineData = {
      idCliente: userCliente?.id,
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      email: formData.email,
      telefone: formData.telefone,
      RegistroGeral: formDataDocumentos.rg,
      cpf: formDataDocumentos.cpf,
      estado_civil: "",
      profissao: "",
      data_nascimento: "",
      estado: formDataendereco.estado,
      endereco: formDataendereco.endereco,
      cidade: formDataendereco.cidade,
      bairro: formDataendereco.bairro,
      cep: formDataendereco.cep,
      afiliado: formDataAfiliados.afiliadoId,
      servico: servico,
      subservico: subservico,
      nomeEnvolvido: formData.nomeenvolvido,
      sobrenomeEnvolvido: formData.sobrenomeenvolvido,
      RegistroGeralEnvolvido: formDataDocumentos.rgenvolvido,
      cpfEnvolvido: formDataDocumentos.cpfenvolvido,

      nomeCartorio: formDataCartorio.cartorio,
      estadoCartorio: formDataCartorio.estadolivro,
      livroCartorio: formDataCartorio.livro,
      folhaCartorio: formDataCartorio.folha,

      nomeCartorioFirmaReconhecida: "",
      estadoCartorioFirmaReconhecida: "",
      livroCartorioFirmaReconhecida: "",

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
          console.log(`documentos[${index}].descricao:`, documento.descricao);
          console.log(`documentos[${index}].arquivo:`, documento.arquivo);
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
      setIsLoading(true);
      try {
        const response = await api.post("criar_cliente/", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsLoading(false);
        toast.success('Dados enviado com sucesso')
        setShowModal(true);

      } catch (error) {
        console.error("Erro ao enviar os dados");
        toast.error('Erro ao enviar os dados, tente novamente mas tarde')
        setIsLoading(false);
        throw error;
      }
    };

    sendDataToServer(formDataToSend)
      .then((data) => {
        console.log("Dados recebidos:");
        toast.success('Dados enviado com sucesso')
        // Faça algo após receber uma resposta bem-sucedida, como mostrar uma mensagem de sucesso.
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:");
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
      handleSendApi(); //Chamando a funcao para enviar os dados.
    } else {
      //Verificando qual etapa
      if (currentStep === 1 && validateAndSave) {
        const isValid = await validateAndSave(); // Valida e salva os dados antes de avançar
        if (isValid) {
          onNextStep();
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
      } else if (currentStep === 6) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  return (
    <div>
      <div>
        <h2 className="mt-10 text-lg font-semibold leading-7 text-gray-900">
          Informações Para Solicitaçao de Consulta de Documentos
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Esta solicitação foi criada especificamente para os clientes que
          desejam realizar uma consulta de documentos em um determinado
          cartório. Por favor, tenha em mente que as informações requeridas para
          tal consulta devem estar corretas e completas para garantir a precisão
          dos resultados
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
          <DadosPessoas
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            setValidateAndSave={setValidateAndSave}
          />
        )}
        {currentStep === 2 && (
          <EnderecoForm
            formDataendereco={formDataendereco}
            handleFormDataChangeEndereco={handleFormDataChangeEndereco}
            setValidateAndSave={setValidateAndSave}
          />
        )}
        {currentStep === 3 && (
          <>
            <FormDocumentos
              formDataDocumentos={formDataDocumentos}
              handleFormDataChangeDocumentos={handleFormDataChangeDocumentos}
              setValidateAndSave={setValidateAndSave}
            />
            <UploadDocumentos
              onFilesChange={handleFilesChange}
              filesState={fileState}
              removeFile={removeFile}
            />
          </>
        )}

        {currentStep === 4 && (
          <DadosCartorio
            handleFormDataChangeCartorio={handleFormDataChangeCartorio}
            formDataCartorio={formDataCartorio}
            setValidateAndSave={setValidateAndSave}
          />
        )}

        {currentStep === 5 && (
          <Afiliados
            handleFormDataChangeAfiliados={handleFormDataChangeAfiliados}
            setValidateAndSave={setValidateAndSave}
            formDataAfiliados={formDataAfiliados}
          />
        )}

        {currentStep === 6 && (
          <>
            {" "}
            <ResumoDadosPessoas
              InfoPessoal={formData}
              Documentos={formDataDocumentos}
              Endereco={formDataendereco}
            />
            <ResumoDadosEnvolvido
              InfoPessoal={formData}
              Documentos={formDataDocumentos}
              Endereco={formDataendereco}
            />
            <ResumoCartorio Cartorio={formDataCartorio} />
            <ResumoAfiliados Afiliados={formDataAfiliados} />
            <ResumoUploadDocumentos fileState={fileState} />
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
