import Header from "@/pages/Hcred/Home/Header";
import UserAccountDetails from "./components/userAccount";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";


export default function UserAccount() {
const { toke: token } = parseCookies();
  const router = useRouter();
  //Monitora o token do usuario
  useEffect(() => {
    if (!token) {
      router.push('/user/acess');
    }
  }, [token, router]);
 
  return (
    <div className="flex min-h-screen flex-col">
          <div className="mb-auto flex-grow pt-28 ">
            <Header />
            <div className="flex items-center justify-center">
              <UserAccountDetails
              /> 
            </div>
          </div>
        </div>
  )
}