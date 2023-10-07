import { useEffect, useState } from "react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../../../../lib/validationSchemas";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import CheckboxComponent from "./CheckboxComponent";
import ButtonComponent from "@/componentesGeral/button";
import axios from "axios";
import { apipublic } from "@/services/apipublic";
import { toast } from "react-toastify";

export const personaInfoSchema = createUserSchema.pick({
  cpf: true,
  nome: true, 
  email: true,
  confirmaemail: true,
  password: true,
  confirmapassword: true,
  telefone: true,
  telefone2: true,
  cep:true,
  cidade: true,
  estado: true,
  bairro: true,
  numero: true,
  complemento: true,
  logradouro: true,
});

interface StepSchemas {
  [key: number]: any;
}


//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof personaInfoSchema>;


export default function FormUser() {

  const [step, setStep] = useState(1);
  const [formDataSttep1, setFormDataSteep1] = useState<Partial<CreateUserData>>({});
  const [formDataSttep2, setFormDataSteep2] = useState<Partial<CreateUserData>>({});
  const [emailError, setEmailError] = useState("");
  const [existsCpf, setExistsCpf] = useState("");
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [emailCadastrado, setEmailCadastrado] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
    clearErrors
  } = useForm<CreateUserData>({
    resolver: zodResolver(personaInfoSchema),
    defaultValues: {
      cpf: formDataSttep1.cpf,
      nome: formDataSttep2.nome,
      email: formDataSttep2.email,
      confirmaemail: formDataSttep2.confirmaemail,
      telefone: formDataSttep2.telefone,
      telefone2: formDataSttep2.telefone2,
      cep:formDataSttep2.cep,
      cidade: formDataSttep2.cidade,
      estado: formDataSttep2.estado,
      bairro: formDataSttep2.bairro,
      numero: formDataSttep2.numero,
      complemento: formDataSttep2.complemento,
      logradouro: formDataSttep2.logradouro,

    },
  });


  const prevStep = () => {
      if (step > 1) {
          setStep(step - 1);
      }
  };
  const handleConfirm = () => {
    router.push('/user/register')
  }

  
  //Validacao do CPF
  const validateCPF = (cpf: any) => {
    // Sua lógica de validação de CPF aqui. 
    // Por exemplo, verifique se tem o comprimento correto, contém apenas números, etc.
    
    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
      setCpfError("CPF inválido. Deve conter apenas 11 dígitos.");
      return false;
      
    }
    setCpfError(null);
    return true;
  };

  //Validacao Step 1
  const handleNextStepOne = async () => {
    const values = getValues();
    setFormDataSteep1(values)
    
    // Primeiro, valide o CPF usando sua função personalizada
    if (!validateCPF(values.cpf)) {
      return; // Retorna se o CPF é inválido
    }
    
    try{ 
      const response = await apipublic.get(`cpf/${values.cpf}/`);
    } catch (error: any){
      if (error.response && error.response.status === 400) {
        setExistsCpf("Esse CPF ja consta cadastrado");
        return;
        
      } else {
        console.error('Ocorreu um erro:', error);
          // Lida com outros tipos de erros aqui.
        }
      }
      clearErrors()
      setExistsCpf("")
      setStep(step + 1); // Avança para a próxima etapa
  };
  
  //Validacao Step 2 Validacao zood
  const handleNextStep = async () => {
    const values = getValues();
    setFormDataSteep2(values)
    
    const isValid = await trigger();
    if (isValid) {
      return true;
    } else {
      return false;
    }
  };

  //Validacao Email
  const handleNextStepEmail = async () => {
    const values = getValues();
    // Verifique a igualdade dos emails antes de validar com o Zod
    if (values.email !== values.confirmaemail) {
      setEmailError("Os e-mails não são iguais");
      return false;
    }
    
    //Verificando se o email existe no servidor
    try{ 
      const response = await apipublic.get(`email/${values.email}/`);
    } catch (error: any){
      if (error.response && error.response.status === 400) {
        setEmailCadastrado("Esse Email ja consta cadastrado");
        return;
        
      } else {
        console.error('Ocorreu um erro:', error);
          // Lida com outros tipos de erros aqui.
        }
      }
    
    setEmailError("");
    setEmailCadastrado("");
    return true;
  };

  //Validacao password
  const handleNextStepPassword = async () => {
    const values = getValues();

    // Verifique a igualdade dos emails antes de validar com o Zod
    if (values.password !== values.confirmapassword) {
      setPasswordError("As senhas não são iguais");
      return false;
    }
    setPasswordError("");
    return true;
  };
  
  async function handleClick() {
    const isValidStep = await handleNextStep();
    const isValidCPF = await handleNextStepEmail();
    const isValidPassword = await handleNextStepPassword();

    if (isValidStep && isValidCPF && isValidPassword) {
      setStep(step + 1); // Avança para a próxima etapa
    }
}

  //funcao que tras as informacoes do Endereco na API Viacep
  const cep = watch('cep');
  useEffect(() => {
    if (cep && cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.data.erro) {
            setValue('logradouro', response.data.logradouro);
            setValue('bairro', response.data.bairro);
            setValue('complemento', response.data.complemento);
            setValue('estado', response.data.uf);
            setValue('cidade', response.data.localidade);

            // Continue para os outros campos...
          }
        })
      .catch (error => {
          
      })
        
    }
  }, [cep, setValue]);

  //Funcao de preparacao para enviar os dados ao servidor
  function createUser(data: CreateUserData, event: any){
    event.preventDefault();

    if (step === 3) {
      setLoading(true);
      const register = {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      password: data.password,
      cep: data.cep,
      logradouro: data.logradouro,
      cidade: data.cidade,
      bairro: data.bairro,
      complemento: data.complemento,
      estado: data.estado,
      numero: data.numero,
      telefone: data.telefone,
      telefone2: data.telefone2
      }
      apipublic.post('register/', register)
        .then(response => {
          toast.success('Cadastro enviado com Sucesso, receberá um email para confirmação!')
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          toast.error('Erro ao enviar os dados, tente mais tarde')
          console.error('Erro ao enviar os dados', error)
        })

      }
    }
 
  return (

    <div className="relative items-center justify-center ml-3 mr-3 mt-5">

      <h1 className="text-center font-semibold text-4xl text-blue-900">Preencha o formulário</h1>
            
      {/* Stepper */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-10 mt-10">
      {[1, 2, 3].map((s, index) => (
        <div key={s} className="relative flex items-center">
          <div 
            className={`w-10 h-10 text-center p-2 rounded-full ${step === s ? 'bg-yellow-400' : 'bg-blue-500'} text-white font-bold`}>
            {s}
          </div>
          {/* Adicionando uma linha para ligar os números, exceto após o último número */}
          {index !== 2 && (
            <div className={`hidden md:block flex-grow h-2 bg-blue-900 mx-0 md:mx-2"`} style={{width: '256px'}}></div>
          )}
          {index !== 2 && (
            <div className="hidden md:block flex-grow h-2 bg-blue-900 mx-0 md:mx-2"></div>
          )}
        </div>
      ))}
      </div>

    <div>
      <form onSubmit={handleSubmit(createUser)} action="">
        <div className="relative  items-center justify-center flex flex-col mb-10 mt-10">
          {step === 1 && (
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  CPF: * (somente números)
              </label>
          
              <div className="mt-2">
                <input
                type='text'
                id='cpf'
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                {...register('cpf')}
                />
              
                {cpfError && <p className="mt-2 text-sm text-red-500">{cpfError}</p>}
                {existsCpf && <p className="mt-2 text-sm text-red-500">{existsCpf}</p>}
         
              </div>
        </div>
          )}
        
          {step === 2 && (
        <>
          <div className="mx-auto w-full max-w-4xl mt-5 flex gap-3">
          {/* Campo de nome */}
            <div className="mx-auto w-full max-w-4xl">
              <label
                htmlFor="nome"
                className="block text-base font-bold leading-6 text-blue-900"
              >
                Nome: *
              </label>
              <div className="mt-2">
                <input
                  type='text'
                  id='nome'
                  style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                  className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                            text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                    {...register('nome')}
                    />
                </div>  
              
                {errors.nome?.message && (
                  <p className="mt-2 text-sm text-red-500">{errors.nome.message}</p>
                )}  
              </div>
          </div>
          
          {/* Campo de Email */}
          <div className="mx-auto w-full max-w-4xl mt-5 flex gap-3">
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  E-mail: *
              </label>
              <div className="mt-2">
              <input
                type="email"
                id='email'
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                    text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              {...register('email')}
              />
              </div>
              {errors.email?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
              )}
              {emailCadastrado && <p className="mt-2 text-sm text-red-500">{emailCadastrado}</p>}
            </div>
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Confirma E-mail: *
              </label>
            
              <div className="mt-2">
                <input
                type="email"
                id="confirmaemail"
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                {...register('confirmaemail')}
                />
              </div>
              {errors.confirmaemail?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.confirmaemail.message}</p>
              )}
              {emailError && <p className="mt-2 text-sm text-red-500">{emailError}</p>}
            </div>
          </div>

          {/* Campo de Senha */}
          <div className="mx-auto w-full max-w-4xl mt-5 flex gap-3">
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Senha: (mínimo de 8 caracteres) *
              </label>
              <div className="mt-2">
              <input
                type="password"
                id='password'
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                    text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              {...register('password')}
              />
              </div>
              {errors.password?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Confirmar Senha: *
              </label>
            
              <div className="mt-2">
                <input
                type="password"
                id="confirmapassword"
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                {...register('confirmapassword')}
                />
              </div>
              {errors.confirmapassword?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.confirmapassword.message}</p>
              )}
              {passwordError && <p className="mt-2 text-sm text-red-500">{passwordError}</p>}
            </div>
          </div>

          {/* Campo de Telefone */}
          <div className="mx-auto w-full max-w-4xl mt-5 flex gap-3">
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Telefone: *
              </label>
              <div className="mt-2">
              <input
                type="telefone"
                id='telefone'
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                    text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              {...register('telefone')}
              />
              </div>
              {errors.telefone?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.telefone.message}</p>
              )}
            </div>
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Telefone 2: 
              </label>
            
              <div className="mt-2">
                <input
                type="telefone2"
                id="telefone2"
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                {...register('telefone2')}
                />
              </div>
              {errors.telefone2?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.telefone2.message}</p>
              )}
            </div>
          </div>

          <div className="mt-5"><h1 className="">Endereço</h1></div>

          {/* Campo de CEP e Logradouro */}
          <div className="mx-auto w-full max-w-4xl mt-5 flex gap-3">
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  CEP: *
              </label>
              <div className="mt-2">
              <input
                type="cep"
                id='cep'
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                    text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              {...register('cep')}
              />
              </div>
              {errors.cep?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.cep.message}</p>
              )}
            </div>
            
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Logradouro: *:
              </label>
            
              <div className="mt-2">
                <input
                type="logradouro"
                id="logradouro"
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                {...register('logradouro')}
                />
              </div>
              {errors.logradouro?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.logradouro.message}</p>
              )}
            </div>
          </div>

          {/* Campo de Numero, Complemento e Bairro */}
          <div className="mx-auto w-full max-w-4xl mt-5 flex gap-3">
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Número: *
              </label>
              <div className="mt-2">
              <input
                type="numero"
                id='numero'
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                    text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              {...register('numero')}
              />
              </div>
              {errors.numero?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.numero.message}</p>
              )}
            </div>
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Complemento:
              </label>
            
              <div className="mt-2">
                <input
                type="complemento"
                id="complemento"
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                {...register('complemento')}
                />
              </div>
              {errors.complemento?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.complemento.message}</p>
              )}
            </div>
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Bairro: *
              </label>
              <div className="mt-2">
              <input
                type="bairro"
                id='bairro'
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                    text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              {...register('bairro')}
              />
              </div>
              {errors.bairro?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.bairro.message}</p>
              )}
            </div>      
          </div>

          {/* Campo de Cidade e Estado */}
          <div className="mx-auto w-full max-w-4xl mt-5 flex gap-3">
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Cidade: *
              </label>
              <div className="mt-2">
              <input
                type="cidade"
                id='cidade'
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                    text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              {...register('cidade')}
              />
              </div>
              {errors.cidade?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.cidade.message}</p>
              )}
            </div>
            <div className="mx-auto w-full max-w-4xl">
              <label
                  htmlFor="nome"
                  className="block text-base font-bold leading-6 text-blue-900"
                  >
                  Estado: *
              </label>
            
              <div className="mt-2">
                <input
                type="estado"
                id="estado"
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                {...register('estado')}
                />
              </div>
              {errors.estado?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.estado.message}</p>
              )}
            </div>
          </div>

        </>
          )}
          </div>
           
        <div className="mx-auto mt-10 max-w-3xl flex items-center justify-between"> 
          {step === 3 && (
            <CheckboxComponent
              name="terms"
              validation={{
              required: "Você deve concordar com os termos para continuar."
              }}
              />
            )}
          
        </div>  
        
        <div className="mx-auto max-w-3xl flex items-center justify-between z-50 mb-5">
          {step === 1 && (
            <ButtonComponent
              nome="VOLTAR"
              onClick={handleConfirm} 
              className=" border-blue-950 text-sm text-blue-950  
                          hover:bg-yellow-400 hover:border-yellow-400 hover:text-white"
              />
                    
          )}
          {step > 1 && (
            <ButtonComponent
              nome="VOLTAR"
              onClick={prevStep} 
              className=" border-blue-950 text-sm text-blue-950  
                          hover:bg-yellow-400 hover:border-yellow-400 hover:text-white"
            />
          )}
          {step === 1 && (
         
               <ButtonComponent 
                nome="CONTINUAR"
                onClick={handleNextStepOne}
                className="mt-2 border-2 bg-blue-500 border-blue-500 text-sm text-white p-2 rounded-2xl 
                            w-40 h-12 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white"
               />
          )}

          {step === 2 && (
                    
                  <ButtonComponent 
                    nome="CONTINUAR"
                    onClick={handleClick}
                    className="mt-2 border-2 bg-blue-500 border-blue-500 text-sm text-white p-2 rounded-2xl 
                                  w-40 h-12 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white"
                  />
          )}

          {step === 3 && (
            <button
              disabled={loading}
              className="mt-2 border-2 bg-blue-500 border-blue-500 text-sm text-white p-2 rounded-2xl 
                          w-40 h-12 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white"
            >
              {loading ? 'Carregando...' : 'SALVAR'}
            </button>
          )}
       
          </div>
        </form>
      </div>    
    </div>
  )
}