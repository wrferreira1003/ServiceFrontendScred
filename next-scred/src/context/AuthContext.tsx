import { recoverUserInformation, signInRequest } from "@/services/auth";
import { createContext, use, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from "@/services/api";

type useData = {
  name: string,
  razao_social: string,
  cnpj: string,
  email: string,
  telefone: string,
  endereco: string,
  bairro: string,
  cidade: string,
  estado: string,
  cep: string,
  avatar: string,
}
type signInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: useData | null;
  signIn: (data: signInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  
  //Salvamos o usuario no estado, pois queremos sempre os dados mais atualizado possivel
  //se salvarmos nos cookies nao teremos os dados caso haja alguma alteracao
  const [user, setUser] = useState< useData | null >(null) 
  
  //Usuario estara autenticado caso o user existir.
  const isAuthenticated = !!user;

  //Vamos criar um UseEffect para que os dados do afiliado sempre seja atualizado, assim
  //que o componente for atualizado
  useEffect(() => {
    /*Quando a componente que esta o provider for renderizado esse UseEffect vai verificar se existe um 
    cookie salvo, caso tenha sabemos que o usuario esta logado, e com isso vamos ao backend buscar os dados 
    atualizado do afiliado.*/
    const { 'tokenAfiliado': token  } = parseCookies() //Pegando o token do afiliado
    if (token) {
      //Aqui dentro devo chamar minha api passando o token e recebendo as informacoes do afiliado
      recoverUserInformation().then( response => {
        setUser(response.user)  
      })
    }
  }, [])

  //Funcao de autenticacao
  async function signIn({email, password}: signInData) {
    // TODO:Aqui dentro fazemos a chamada para api, enviar os dados de email e senha do afiliado, trazer o token
    // e salvar no localstorage juntamente com as informacoes do afiliado retornada pela api.
    const { token, user} = await signInRequest({
      email,
      password,
    })
    //Aqui eu guardo o token do afiliado com um secao de 1hora
    setCookie(undefined, 'tokenAfiliado', token, {
      maxAge: 60 * 60 * 1 //1 hours //numeros em segundo para e expiracao do cookies(Secao)
    })
    //Aqui eu ja passo o token de validacao para minha api ja ficar com a informacao atualizada para realizar as requisicoes
    api.defaults.headers['authorization'] = `Bearer ${token}`;

    //Aqui eu guardo os dados do usuario para utilizar na aplicacao
    setUser(user)

    //Redirecionando caso tenha dado certo
    Router.push('/afiliados/home')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn}} >
      { children }
    </AuthContext.Provider>
  )
}
