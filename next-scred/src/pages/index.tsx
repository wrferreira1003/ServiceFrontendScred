import HomeComponents from "./Hcred/Home";
import Header from "./Hcred/Home/Header";
import Head from "next/head";
import RegisterUser from "./user/register";

export default function Home() {
  return (
    <>
      <Head>
        <title>Serviço | HCred</title>
      </Head>

      <div className="flex min-h-screen flex-col">
        <div className="mb-auto">
          <Header />
          <RegisterUser />
        </div>
      </div>
    </>
  );
}
