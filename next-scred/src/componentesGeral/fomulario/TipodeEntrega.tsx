import { useEffect, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from "react-hook-form";

const schema = z.object({
  option: z
    .union([z.literal('impressa'), z.literal('eletronica')])
    .refine(value => value !== null, { message: 'Uma opção deve ser selecionada!' })
});
interface FormularioSolicitacaoProps {
  handleFormDataChangeEntrega: (data: any) => void;
  setValidateAndSave: React.Dispatch<
    React.SetStateAction<(() => Promise<boolean>) | null>
  >;
}


export default function TipoDeEntrega({ handleFormDataChangeEntrega, //Funcao que recebe os dados
                                        setValidateAndSave,}:FormularioSolicitacaoProps) {

  const { register,trigger,getValues, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const validateAndSave = async () => {
    const isValid = await trigger();

    // Valida os campos
    if (isValid) {
      handleFormDataChangeEntrega(getValues()); // Se for válido, envia os valores para o componente pai
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setValidateAndSave(() => validateAndSave);
    //eslint-disable-next-line
  }, []);

  async function createUser(data: any) {
    try {
      handleFormDataChangeEntrega(data);
    } catch (erro) {
      console.error(erro);
    }
  }

  
  return (
    <form onSubmit={handleSubmit(createUser)}>
    <fieldset>
      <legend className="sr-only"></legend>
      <div className="space-y-5 mt-5">
      <div className="ml-3 text-sm leading-6 mb-5 bg-blue-100 w-1/4 p-4 space-y-4">
        <p className="text-gray-500">
          -Certidão Impressa está sujeita ao prazo de emissão de 5 dias úteis e prazo de entrega a ser calculado com base na 
          localização do endereço de entrega
        </p>
        <p className="text-gray-500">
          -Certidão eletrônica está sujeita apenas ao prazo de emissão de 5 dias úteis. Após a emissão, a certidão será enviada
          para o e-mail cadastrado no site.
        </p>
      </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="impressa"
              aria-describedby="impressa"
              value="impressa"
              type="radio"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              {...register('option')}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="impressa" className="font-medium text-gray-900">
              Impressa
            </label>
            <p id="impressa" className="text-gray-500">
              Receba em seu endereço ou retire em um Cartório de sua preferencia a Certidão em papel oficial.
            </p>
            {errors.option && typeof errors.option.message === 'string' && (
            <p className="mt-2 text-sm text-red-500">
              {errors.option.message}
            </p>
)}
          </div>
        </div>
        <div className="relative flex items-start mt-5">
          <div className="flex h-6 items-center">
            <input
              id="eletronica"
              aria-describedby="eletronica-description"
              value="eletronica"
              type="radio"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              {...register('option')}
    
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="eletronica" className="font-medium text-gray-900">
              Eletronica
            </label>
            <p id="eletronica-description" className="text-gray-500">
              Receba o link da certidão em seu e-mail.
            </p>
          </div>
        </div>
      </div>
    </fieldset>
    </form>
  )
}

