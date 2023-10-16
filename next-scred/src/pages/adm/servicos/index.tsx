import HeaderAdmAfiliado from "../componentes/HeaderAdmAfiliados";
import InicioUsuario from "@/pages/servicosOnline/components/inicio";
import BannerComponentsGeral from "@/componentesGeral/BannerComponentsGeral";
import BuscaTipoRegistro from "@/componentesGeral/fomulario/NovosPequenosComponents/BuscaTipoRegistro";
import UserLayoutAdm from "../User_layout";

export default function ServicosAfiliados() {
  return (
    <UserLayoutAdm texto="Serviços Online">
    <div>
      <div className="flex min-h-screen flex-col">      
        <div className="mt-10">
          <InicioUsuario /> 
        </div>
      </div>
    </div> 
    </UserLayoutAdm>
  )
}