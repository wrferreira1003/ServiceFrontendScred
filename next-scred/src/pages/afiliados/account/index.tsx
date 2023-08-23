import MeusDados from "@/componentesGeral/MeusDados";
import HeaderDash from "../components/headerDash";
import PerfilDados from "@/componentesGeral/PerfilDados";

export default function Request(){
  return (
   <>
     <HeaderDash />
     <div className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl items-start 
                    gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        
        <aside className="w-64 h-86 bg-slate-200 p-2 mb-4 lg:mb-0 rounded-lg">
          <PerfilDados />
        </aside>
        
        <main className="flex-1 bg-slate-200 rounded-lg p-4">
          <MeusDados />
        </main>
      </div>
    </>
  )
}