import BannerComponentsGeral from '@/componentesGeral/BannerComponentsGeral';
import HeaderAdmAfiliado from '@/pages/adm/componentes/HeaderAdmAfiliados';
import HomeCartorarios from './componentes/homeCartorario';



//Componente principal para os Servicos Cartorarios
export default function ServicosCartorario() {

  return (

    <div>
      <div className="flex min-h-screen flex-col">
        <HeaderAdmAfiliado />
        <BannerComponentsGeral
          texto='Serviços Cartorários'  
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <HomeCartorarios /> 
        </div>
      </div>
    </div> 
  )
}