import Head from "next/head";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Tabelionato from "./Form";
import { ServicoProvider } from "../../../context/servicocontext";

export default function FormTabelionato() {
  return (
    <>
      <ServicoProvider>
        <Head>
          <title>Tabelionato | HCred</title>
        </Head>
        <div className="flex min-h-screen flex-col">
          <div className="mb-auto flex-grow pt-28">
            <Header />
            <Tabelionato />
          </div>
        </div>
      </ServicoProvider>
    </>
  );
}
