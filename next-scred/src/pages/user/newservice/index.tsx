import DropdowComponents from "@/pages/servicosOnline/components/dropdowComponents";
import { useRouter } from "next/router";
import UserLayout from "../UserLayout";
import ButtonToGoBack from "@/componentesGeral/ButtonVoltar";
import { parseCookies } from "nookies";
import { useEffect } from "react";


export default function NewService() {

  const router = useRouter()
  const { tokenUser: token } = parseCookies();

  useEffect(() => {
    if (!token) {
      router.push('/user/acess');
    }
  }, [token, router]);

  return (
    <UserLayout>
          <div className="mb-auto flex-grow pt-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between">
              <ButtonToGoBack route='/user/requests'/>
            </div>
          
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
              <DropdowComponents 
                linkServicoCartorario = '/user/newservice/cartorio'/> 
            </div>
          </div>
    </UserLayout>

  )
}