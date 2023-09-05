import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirmaCadastro: React.FC<ModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* <-- Adicione esta linha */}
  
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-1/2">
        <h2 className="text-xl mb-4">Você é maior que 18 anos?</h2>
        <div className="flex justify-end gap-5">
          <button onClick={onCancel} className="px-4 py-2 bg-red-500 text-white rounded-md">Não</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-green-500 text-white rounded-md">Sim</button>
        </div>
      </div>
    </div>
  );
  
};

export default ModalConfirmaCadastro;
