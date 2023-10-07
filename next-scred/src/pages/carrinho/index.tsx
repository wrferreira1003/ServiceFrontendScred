import Head from "next/head";
import BannerComponents from "../servicosOnline/components/bannerComponents";
import HeaderAdmAfiliado from "../adm/componentes/HeaderAdmAfiliados";

export default function Carrinho(){
  return (

    <div>
        <Head>
          <title>RC Fácil</title>
        </Head>
       
            
              <HeaderAdmAfiliado />
              <BannerComponents/>
             
         
    

     
    </div> 
    
  )
}