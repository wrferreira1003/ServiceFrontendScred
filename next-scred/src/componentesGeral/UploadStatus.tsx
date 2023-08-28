// UploadStatus.js
import Link from 'next/link';
import React from 'react';

type TypeProps = {
  userId : number | null
  setOpenModal: (value: boolean) => void;
};

export default function UploadStatus({ status, onclose, onSucess  }: any) {
  if (!status) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
      {status === 'success' && (
        <div className="bg-green-100 p-8 rounded-md shadow-lg w-96">
          <h2 className="text-green-700 mb-4 font-bold">Upload bem-sucedido!</h2>
          {/* Aqui, você pode adicionar um ícone de sucesso ou qualquer outro estilo de sua escolha. */}
          <p>Seus dados foram enviados e processados com sucesso.</p>
          <Link href="/adm/signup"
            className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Ir para a página X
          </Link>
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-100 p-8 rounded-md shadow-lg w-96">
          <h2 className="text-red-700 mb-4 font-bold">Erro ao fazer o upload.</h2>
          {/* Aqui, você pode adicionar um ícone de erro ou qualquer outro estilo de sua escolha. */}
          <p>Desculpe, encontramos um problema ao processar seus dados.</p>
          <Link href="/paginaDeErro"
            className="mt-4 inline-block bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Saiba mais
          </Link>
        </div>
      )}
    </div>
  );
}
