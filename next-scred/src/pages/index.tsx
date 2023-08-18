import HomeComponents from "./Hcred/Home";
import Footer from "./Hcred/Home/Footer";
import Header from "./Hcred/Home/Header";
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Serviço | HCred</title>
      </Head>
    
      <div className="flex flex-col min-h-screen">
        <div className="mb-auto pt-28">
          <Header />
          <HomeComponents />
        </div>
      </div>
      
    </>

  )
}

