import React from 'react';
import {RegisterOptions } from 'react-hook-form';

interface CheckboxProps {
  name: string;
  validation?: RegisterOptions;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({ name, validation }) => {
  return (
    <div>
      <h1>ATENÇÃO!</h1>
      <p className='mt-5'>É de inteira responsabilidade do usuário a inserção dos dados corretos no 
          formulário de cadastro sob pena de ser responsabilizado civil e criminalmente 
          pelos danos que causar por indicar dados falsos.</p>

      <p className='mt-5'>Ainda, o usuário também será responsabilizado pelas lesões causadas caso 
      não mantenha as informações atualizadas ou as inclua de maneira incorreta ou inexata.</p>

      <p className='mt-5'>Ao clicar no botão abaixo, você está de acordo com nossa Política de Privacidade..</p>
      
      <label className="block mt-5 mb-10">
        <input 
        type="checkbox" 
        required
        />
        <span className="text-sm ml-2">Li, e estou ciente.</span>
      </label>
    </div>
  );
}

export default CheckboxComponent;
