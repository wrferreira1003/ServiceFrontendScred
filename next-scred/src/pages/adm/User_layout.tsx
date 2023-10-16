import { ReactNode, useContext } from "react";
import HeaderAdmAfiliado from "./componentes/HeaderAdmAfiliados";
import BannerComponentsGeral from "@/componentesGeral/BannerComponentsGeral";


type UserLayoutProps = {
  children: ReactNode;
  texto: string;
}

export default function UserLayoutAdm({children, texto}:UserLayoutProps){

  return (
    <div className="mb-auto flex-grow relative">
      <div className="sticky top-0 z-50 bg-white">
        <HeaderAdmAfiliado />
        <BannerComponentsGeral
          texto={texto} 
        />
      </div>
      {children}
    </div>
  )
}