import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../../lib/validationSchemas";
import { AuthUserContext } from "@/context/AuthUserContext";
import { apipublic } from "@/services/apipublic";
import { AuthContext } from "@/context/AuthContext";

const personalInfoSchema = createUserSchema.pick({
  nome: true,
  cpf: true,
  conjugue1: true,
  conjugue2: true,
  DtCasamento: true,
});

//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof personalInfoSchema>;

interface FormularioSolicitacaoProps {
  handleFormDataChange: (data: CreateUserData) => void;
  formData: CreateUserData | undefined;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}

export default function DadosPessoasCasamento({
  formData,
  handleFormDataChange, //Funcao que recebe os dados
  setValidateAndSave,
}: FormularioSolicitacaoProps) {

  const {userCliente} = useContext(AuthUserContext)
  const {user} = useContext(AuthContext)
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    trigger,
    setValue,
    watch
  } = useForm<CreateUserData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      nome: formData ? formData.nome : "",
      cpf: formData ? formData.cpf : "",
      conjugue1: formData ? formData.conjugue1: "",
      conjugue2: formData ? formData.conjugue2: "",
      DtCasamento: formData ? formData.DtCasamento : "",
      //Colocar os valores default para cada campo.
    },
  });

  const validateAndSave = async () => {
    const isValid = await trigger();

    // Valida os campos
    if (isValid) {
      handleFormDataChange(getValues()); // Se for válido, envia os valores para o componente pai
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setValidateAndSave(() => validateAndSave);
    //eslint-disable-next-line
  }, []);

  async function createUser(data: CreateUserData) {
    try {
      setMessage("Dados enviados com sucesso.");
      handleFormDataChange(data);
    } catch (erro) {
      console.error(erro);
      setMessage("Favor revisar os dados da solicitação");
    }
  }

  useEffect(() => {
    // Quando o componente renderizar, verifique se o user e userCliente estão definidos
    if (
      (user && user.user_type !== "Afiliado" || !user) && 
      userCliente && 
      userCliente.cpf) {
      // Se não for um afiliado, atualize o CPF para o CPF do usuário
      setValue('cpf', userCliente.cpf);
    }
  }, [setValue, user, userCliente]);


  //funcao que tras as informacoes do Endereco na API Viacep
  const cpf = watch('cpf');
  useEffect(() => {
    if (cpf && cpf.length === 11) {
      apipublic.get(`listcpf/${cpf}/`)
      .then(response => {
      if (!response.data.erro) {
        setValue('nome', response.data.nome);
  
        // Continue para os outros campos...
      }
    })
    .catch (error => {
        
        })
    }
  }, [cpf, setValue]);

 
  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(createUser)} action="">
        <h2
          className="mt-10 text-lg font-semibold
                       leading-7 text-gray-900"
        >
          Dados do Solicitante
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          {/* Campo cpf */}
          <div className="sm:col-span-3">
            <label
              htmlFor="cpf"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              CPF
            </label>
            <div className="mt-2">
              <input
                disabled={user?.user_type !== "AFILIADO"}
                id="cpf"
                type="cpf"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("cpf")}
              />
            </div>
            {errors.cpf && (
              <p className="mt-2 text-sm text-red-500">
                {errors.cpf.message}
              </p>
            )}
          </div>


          {/* Campo Nome */}
          <div className="sm:col-span-3">
            <label
              htmlFor="nome"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome do solicitante
            </label>
            <div className="mt-2">
              <input
                disabled={user?.user_type !== "AFILIADO"}
                type="text"
                id="nome"
                className="block w-full rounded-md border-0 px-1 py-1.5
                           text-gray-900 shadow-sm ring-1 ring-inset 
                           ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("nome")}
              />
            </div>
            {errors.nome && (
              <p className="mt-2 text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>

          {/* Campo Conjugue 1 */}
          <div className="sm:col-span-3">
            <label
              htmlFor="conjugue1"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome do primeiro cônjugue
            </label>
            <div className="mt-2">
              <input
                id="conjugue1"
                type="conjugue1"
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("conjugue1")}
              />
            </div>
            {errors.conjugue1 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.conjugue1.message}
              </p>
            )}
          </div>

          {/* Campo Conjugue 2 */}
          <div className="sm:col-span-3">
            <label
              htmlFor="conjugue2"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome do segundo cônjugue
            </label>
            <div className="mt-2">
              <input
                type="conjugue2"
                id="conjugue2"
       
                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("conjugue2")}
              />
            </div>
            {errors.conjugue2 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.conjugue2.message}
              </p>
            )}
          </div>

          {/* Data de Nascimento */}
          <div className="sm:col-span-3">
                      <label
                        htmlFor="DtCasamento"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Data de casamento
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          id="DtCasamento"
                          placeholder="Digite sua Profissáo"
                          className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900
                                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("DtCasamento")}
                        />
                      </div>
                      {errors.DtCasamento && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.DtCasamento.message}
                        </p>
                      )}
                    </div>
        </div>
      </form>
    </div>
  );
}