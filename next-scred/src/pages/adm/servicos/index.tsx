import HeaderAdmAfiliado from "../componentes/HeaderAdmAfiliados";
import InicioUsuario from "@/pages/servicosOnline/components/inicio";
import BannerComponentsGeral from "@/componentesGeral/BannerComponentsGeral";

export default function ServicosAfiliados() {
  
 
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