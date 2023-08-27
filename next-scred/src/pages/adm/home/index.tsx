import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import HeaderAdmAfiliado from '../componentes/HeaderAdmAfiliados';

export default function HomeAfiliado() {
  const router = useRouter();
  const { user } = useContext(AuthContext)
  
  return (
    <>
        <HeaderAdmAfiliado 
        /> 

    </>
  )
}

//Aqui estou fazendo verificaoes pelo lado do servidor next se existe o token
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['tokenAfiliado']: token} = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
    return {
    props: {}
  }
  }

    