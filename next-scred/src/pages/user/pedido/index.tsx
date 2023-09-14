import Header from "@/pages/Hcred/Home/Header";
import BannerComponents from "../servicosOnline/components/bannerComponents";
import UserPedidos from "./componentes/userPedidos";

export default function ConsultaPedidos(){
  return (
    <div className="flex min-h-screen flex-col">
          <div className="mb-auto flex-grow pt-28">
            <Header />
            <BannerComponents/>
            <UserPedidos />
          </div>
    </div>
  )
}