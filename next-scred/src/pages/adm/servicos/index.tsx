import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HeaderAdmAfiliado from "../componentes/HeaderAdmAfiliados";
import InicioUsuario from "@/pages/servicosOnline/components/inicio";
import ButtonComponent from "@/componentesGeral/button";
import BannerComponentsGeral from "@/componentesGeral/BannerComponentsGeral";

export default function ServicosAfiliados() {
  
  const router = useRouter();
  const { tokenAfiliado: tokenAfil } = parseCookies();
  
  //Monitora o token do usuario
  useEffect(() => {
    if (!tokenAfil) {
      router.push('/login');
    }
  }, [tokenAfil, router]);

  
  return (

    <div>
      <div className="flex min-h-screen flex-col">
        <HeaderAdmAfiliado />
        <BannerComponentsGeral
          texto='Serviços Online'  
        />
        <div className="mt-10">
          <InicioUsuario /> 
        </div>
      </div>
    </div> 
  )
}