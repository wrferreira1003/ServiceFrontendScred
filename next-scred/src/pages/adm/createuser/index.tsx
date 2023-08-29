import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import HeaderAdmAfiliado from "../componentes/HeaderAdmAfiliados";
import CreateUserComponents from "./AdmCreateUser/CreateUser";



export default function CreateUser() {
  return (
    <>
    <HeaderAdmAfiliado/>  

    <CreateUserComponents/>

    </>
  )
}

//Aqui estou fazendo verificaoes pelo lado do servidor next se existe o token
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { ["tokenAfiliado"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {

    },
  };
};