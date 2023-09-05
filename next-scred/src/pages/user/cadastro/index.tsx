import Header from "@/pages/Hcred/Home/Header";
import FooterUser from "../register/componentes/FooterUser";
import FormUser from "./componetes/FormUser";


export default function UserFomaulario(){
  return (
    <>
      
      <Header />
      <div className="mt-24">
        <FooterUser/>
      </div>
        <FormUser />
      
    </>
  )
}