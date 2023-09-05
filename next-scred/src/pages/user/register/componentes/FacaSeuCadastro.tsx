import { useRef, useState } from "react";
import FooterUser from "./FooterUser";
import userlogo from "../../../../assets/user.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ModalConfirmaCadastro from "./modalConfirmacadastro";

export default function FacaSeuCadastro() {
  
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleConfirm = () => {
    setShowModal(false)
    router.push('/user/cadastro')
  }

  const handleCancela = () => {
    setShowModal(false)
    router.push('/user/register')
  }


  return (
    <div className="bg-white relative pl-10 max-w-7xl mx-auto mt-40">
 
      <div className="text-left">
        <h1 className="text-4xl font-bold tracking-tight text-blue-900 sm:text-6xl">
            Faça seu cadastro
        </h1>
            
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mt-10">

          <Image
            className="h-52 w-auto"
            src={userlogo}
            width={520}
            height={480}
            alt=""
          />
          <p className="mt-6 text-lg leading-8 text-gray-600">
            O cadastro permite a utilização deste Portal e requer acesso com login e senha. 
            Alguns serviços exigem o uso do Certificado Digital ICP-Brasil. 
            No primeiro acesso o usuário deverá preencher o cadastro. 
            Os dados serão utilizados para emissão de boleto bancário, 
            nota fiscal, eventuais comunicações, bem como a devolução de saldos existentes. 
            Todos os dados e transações estão absolutamente protegidos, 
            de conformidade com nossa Política de Privacidade.
          </p>              
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          COMEÇAR O CADASTRO
        </button>
      </div>
       
      <FooterUser/>
   
    </div>
      <ModalConfirmaCadastro
      isOpen={showModal}
      onConfirm={handleConfirm}
      onCancel={handleCancela}
      />
  </div>
  )
}
