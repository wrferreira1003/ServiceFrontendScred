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
            <div className="mb-auto flex-grow pt-28">
              <Header />
              <BannerComponents/>
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


