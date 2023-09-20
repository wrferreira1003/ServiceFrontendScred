import { createUserSchema } from "@/lib/validationSchemas";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { apipublic } from "@/services/apipublic";
import { toast } from "react-toastify";
import { AuthUserContext } from "@/context/AuthUserContext";

export const personaInfoSchema = createUserSchema.pick({
  confirmapassword: true,
  password: true,
});

//Criando a typagem a partir do Schema de validação
type CreateUserData = zod.infer<typeof personaInfoSchema>;


export default function ResetPassword(){
  const [passwordError, setPasswordError] = useState("");
  const {userCliente} = useContext(AuthUserContext)

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<CreateUserData>({
    resolver: zodResolver(personaInfoSchema),
    defaultValues: {
     
    },
  });

  //Validacao password
  const handleNextStepPassword =  () => {
    const values = getValues();

    // Verifique a igualdade dos emails antes de validar com o Zod
    if (values.password !== values.confirmapassword) {
      setPasswordError("As senhas não são iguais");
      return false;
    }
    setPasswordError("");
    return true;
  };

  //Funcao de preparacao para enviar os dados ao servidor
  function createUserPassword(data: CreateUserData, event: any){
    event.preventDefault();
    const id = userCliente?.id
    
    if (handleNextStepPassword()) {

      const dados = {
        password: data.password,
      }
      apipublic.put(`atualiza/${id}/`, dados)
        .then(response => {
          toast.success('Senha atualizado com Sucesso!')

        })
        .catch(error => {
          toast.error('Erro ao enviar os dados, tente mais tarde')
          console.error('Erro ao enviar os dados', error)
        })
    }
  }
  return(

    <div className="mb-5 mt-10">
      <form onSubmit={handleSubmit(createUserPassword)} action="">
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
            {errors.password?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
              )}
            {passwordError && <p className="mt-2 text-sm text-red-500">{passwordError}</p>}
            </div>
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
              {errors.confirmapassword?.message && (
                <p className="mt-2 text-sm text-red-500">{errors.confirmapassword.message}</p>
              )}
          </div>    
        </div>
        
      </div>    
        <button
          className="mt-5 border-2 bg-blue-500 border-blue-500 text-sm text-white p-2 rounded-2xl 
                          w-40 h-12 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white"
          >ATUALIZAR SENHA
        </button>
    </form>
  </div>

  )
}