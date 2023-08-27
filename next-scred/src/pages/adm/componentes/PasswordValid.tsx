import { api } from "@/services/api";
import { useState } from "react";

interface InfoIdType {
  id: number
}

interface RequestIDProps {
  InfoId: InfoIdType;
}

export default function PasswordValid({InfoId}: RequestIDProps) {
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("As novas senhas não coincidem!");
      return;
    }
    try {
      const response = await api.post(`afiliado/${InfoId.id}/change_password`,{
      old_password: currentPassword,
      new_password: newPassword 
    })
    setMessage("Dados atualizados com sucesso!");
    setIsErrorMessage(false);
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
    } catch (error) {
    console.error("Erro ao enviar dados", error);
    setMessage('Ocorreu um erro ao tentar alterar a senha.');
    setIsErrorMessage(true);
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }
}
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 mt-8">
        <div className=" border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Alteração de Senha
          </h2>

        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          
        <div className="sm:col-span-2">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              >Senha Atual:
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)} 
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset
                          ring-gray-300 placeholder:text-gray-400 focus:ring-2
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              >Nova Senha:
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} 
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset
                          ring-gray-300 placeholder:text-gray-400 focus:ring-2
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <label
              htmlFor="cidade"
              className="block text-sm font-medium leading-6 text-gray-900"
              >Confirme a Nova Senha
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={confirmNewPassword} 
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required 
                className="block w-full rounded-md border-0 px-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className={isErrorMessage ? "text-red-600" : "text-green-600"}>
          {message}
        </div>
        <button
          type="submit"
          className="mt-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold 
                  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2 
                  focus-visible:outline-indigo-600"
          >Atualizar Senha
        </button>
        </div>
      </div> 
    </form>
  );
}