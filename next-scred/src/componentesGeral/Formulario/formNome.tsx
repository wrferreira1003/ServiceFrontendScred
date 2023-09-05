import { UseFormRegister } from 'react-hook-form';
import * as zod from "zod";


interface FormNomeProps {
  nome: string;
  id: string;
  formRegister: UseFormRegister<any>;
  type: string;


}

export default function FormNomeComponent({nome, id, formRegister, type}: FormNomeProps) {
  console.log('Register function:', formRegister);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <label
          htmlFor="nome"
          className="block text-base font-bold leading-6 text-blue-900"
          >
          {nome}
      </label>
      
      <div className="mt-2">
        <input
        type={type}
        id={id}
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
        className="block w-full rounded-2xl border-0 px-5 py-2 text-base
                text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
        {...formRegister(id)}
        />
      </div>
    </div>      
  )

}


