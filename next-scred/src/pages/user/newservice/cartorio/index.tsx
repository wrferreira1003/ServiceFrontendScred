import HomeCartorarios from "@/pages/servicosOnline/servicosCartorario/componentes/homeCartorario";
import UserLayout from "../../UserLayout";
import ButtonToGoBack from "@/componentesGeral/ButtonVoltar";

export default function Cartorio() {
 

  return (
    <UserLayout>
      <div className="flex min-h-screen flex-col">
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <div className="mb-10">
            <ButtonToGoBack route = '/user/newservice'/>
          </div>
          <HomeCartorarios />
        </div> 
      </div>
    </UserLayout>

  )
}