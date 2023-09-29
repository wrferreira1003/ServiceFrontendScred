import Header from "@/pages/Hcred/Home/Header";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import ReconhecimentoVerdadeiro from "./components/ReconhecimentoVerdadeiro";

export default function FirmaVerdadeiro(){
  const router = useRouter();
  const { tokenUser: token } = parseCookies();
  
  //Monitora o token do usuario
  useEffect(() => {
    if (!token) {
      router.push('/user/acess');
    }
  }, [token, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mb-auto flex-grow pt-28">
        <Header />
        <div className="mx-auto w-3/5">
        <ReconhecimentoVerdadeiro />
        </div>
      </div>
    </div>
  )
}