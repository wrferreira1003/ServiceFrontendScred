import Header from "@/pages/Hcred/Home/Header";
import { useRouter } from "next/router";
import InicioUsuario from "./components/inicio";
import Head from "next/head";
import BannerComponents from "./components/bannerComponents";
import ButtonComponent from "@/componentesGeral/button";



export default function ServicosOnline() { 
  
  const router = useRouter();
 
 
  
  return (

    <div>
    <Head>
        <title>RC Fácil</title>
    </Head>
    <div className="flex min-h-screen flex-col">
        {/* Mantenha o Header e BannerComponents fixos */}
        <div className="sticky top-0 z-50 bg-white">
            <Header />
            <BannerComponents/>
        </div>

        <div className="mb-auto flex-grow pt-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ButtonComponent
                    nome='PROPOSTAS'
                    onClick={() => {router.push(`/user/requests`)}}
                    className='mb-5 mt-5'
                />
            </div>
            <InicioUsuario /> 
        </div>
    </div>
</div>
  )
}


