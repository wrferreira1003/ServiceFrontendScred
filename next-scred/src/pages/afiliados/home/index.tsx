import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'
import Header from '@/pages/Hcred/Home/Header';
import HeaderAfiliado from '../componentes/HeaderAfiliados';
import { api } from '@/services/api';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';


export default function HomeAfiliado() {
  const router = useRouter();
  const { user } = useContext(AuthContext)

  //Assim que usuario fazer login eu faco uma requisao dos dados ao meu backend
  //useEffect(() => {
  //  api.get('/users/')
  //})

  return (
    <>
      {user && user.avatar ? <HeaderAfiliado 
        avatar={user.avatar} 
        name={user.name}
        email={user.email}
        /> : null}
    </>
  )
}

//Aqui estou fazendo verificaoes pelo lado do servidor next se existe o token
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['tokenAfiliado']: token} = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/afiliados',
        permanent: false,
      }
    }
  }
    return {
    props: {}
  }
  }

    