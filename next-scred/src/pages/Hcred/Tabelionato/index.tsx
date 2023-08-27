import Head from "next/head";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Tabelionato from "./Form";
import {ServicoProvider} from "../../../context/servicocontext";



export default function FormTabelionato(){
  return (
    
    <>
    <ServicoProvider>
      <Head>
        <title>Tabelionato | HCred</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="mb-auto pt-28 flex-grow">
          <Header />
          <Tabelionato />
        </div>

      </div>
    </ServicoProvider>
    </>
)
}