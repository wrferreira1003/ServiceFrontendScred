import { InfoDataType } from "@/types/Adm/types";
import Header from "@/pages/Hcred/Home/Header";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import InicioUsuario from "./components/inicio";
import Head from "next/head";
import BannerComponents from "./components/bannerComponents";


export default function ServicosOnline() {
  
  const router = useRouter();
  const { tokenUser: token } = parseCookies();
  
  //Monitora o token do usuario
  useEffect(() => {
    if (!token) {
      router.push('/user/acess');
    }
  }, [token, router]);
  
  return (

    <div>
        <Head>
          <title>RC Fácil</title>
        </Head>
        <div className="flex min-h-screen flex-col">
          <div className="mb-auto flex-grow pt-28">
            <Header />
            <BannerComponents/>
            <InicioUsuario /> 
          </div>
        </div>

     
    </div> 
  )
}


