import HomeComponents from "./Hcred/Home";
import Header from "./Hcred/Home/Header";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Serviço | HCred</title>
      </Head>

      <div className="flex min-h-screen flex-col">
        <div className="mb-auto pt-28">
          <Header />
          <HomeComponents />
        </div>
      </div>
    </>
  );
}
