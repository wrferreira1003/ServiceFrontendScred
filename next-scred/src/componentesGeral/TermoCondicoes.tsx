import Link from 'next/link';
import React, { useState } from 'react';
import {RegisterOptions } from 'react-hook-form';

interface CheckboxProps {
  name: string;
  validation?: RegisterOptions;
  onCheckedChange?: (isChecked: boolean) => void; // função de retorno de chamada opcional
}

export default function TermoCondicoes({ name, validation, onCheckedChange }: CheckboxProps){
  const [isChecked, setIsChecked] = useState(false);
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onCheckedChange) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <div className='w-full bg-blue-100 text-xs px-5 py-5 mt-10'>
      <h1>Termos e condições</h1>
      <p className='mt-5'>Declaro ter ciência das condições abaixo listadas deste serviço.</p>

      <p className='mt-5'> 1- O valor pago refere-se a localização do registro que encontra-se na base 
      de dados da central de informações do Registro Civil.</p>

      <p className='mt-5'>2- Este valor não será reembolsado após a realização da busca.</p>
      <p className='mt-5'>3- Este sistema não se responsabiliza por erros ou omissões nos dados 
      informado.</p>
      <p className='mt-5'>4- O usuário certifica-se que os dados informados não contém erros de digitação.</p>
      
      <label className="block mt-5 mb-10">
        <input 
        type="checkbox" 
        checked={isChecked}
        onChange={handleCheckboxChange}
        required
        />
        <span className="text-sm ml-2">
          Declaro que li e concordo com os
        </span>
        <Link className='text-sm ml-2 font-bold' href="">termos de uso do sistema RC Fácil</Link>
      </label>
    </div>
  );
}
