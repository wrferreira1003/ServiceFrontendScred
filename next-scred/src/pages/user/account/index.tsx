import Header from "@/pages/Hcred/Home/Header";
import UserAccountDetails from "./components/userAccount";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import UserLayout from "../UserLayout";


export default function UserAccount() {
  const { tokenUser: token } = parseCookies();
  const router = useRouter();
  //Monitora o token do usuario
  useEffect(() => {
    if (!token) {
      router.push('/user/acess');
    }
  }, [token, router]);
 
  return (
    <UserLayout>
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-center">
          <UserAccountDetails/> 
        </div>
      </div>
    </UserLayout>
  )
}