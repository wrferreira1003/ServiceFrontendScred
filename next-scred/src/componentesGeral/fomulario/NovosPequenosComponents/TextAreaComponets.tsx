import { useEffect, useRef, useState } from "react";

type ChildProps = {
  onComentChange: (value: string) => void;
  servico: string | undefined;
}

export default function TextAreaComponents({onComentChange, servico}: ChildProps) {
  const [comment, setComment] = useState('');

  const handleInputChange = (e:any) => {
    const value = e.target.value
    setComment(e.target.value);
    onComentChange(value)
  };

  return (
    <div className="mt-10">
      <label htmlFor="comment" className="block text-lg font-medium leading-6 text-gray-900">
        {`Adicione uma Observação sobre a sua solicitação - ${servico}`}
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={comment}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
