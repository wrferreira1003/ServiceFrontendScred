import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { apiuser } from "@/services/api";
import { apipublic } from "@/services/apipublic";

export type useData = {
  id: number;
  nome: string,
  cpf: string,
  email: string,
  cep: string,
  logradouro: string,
  cidade: string,
  bairro: string,
  complemento: string,
  estado: string,
  numero: string,
  telefone: string,
  telefone2: string
};
type signInData = {
  email: string;
  senha: string;
};

type AuthContextType = {
  isAuthenticatedUser: boolean;
  userCliente:useData | null;
  signInUser:(data: signInData) => Promise<void>;
  signOutUser: () => Promise<void>;
};

export const AuthUserContext = createContext({} as AuthContextType);

export function AuthUserProvider({ children }: any) {
  //Salvamos o usuario no estado, pois queremos sempre os dados mais atualizado possivel
  //se salvarmos nos cookies nao teremos os dados caso haja alguma alteracao
  const [userCliente, setUserCliente] = useState<useData | null>(null);
  //Usuario estara autenticado caso o user existir.
  const isAuthenticatedUser = !!userCliente;

  const { IdUser: IdUser } = parseCookies(); 

  useEffect(() => {
    /*Quando a componente que esta o provider for renderizado esse UseEffect vai verificar se existe um 
    cookie salvo, caso tenha sabemos que o usuario esta logado, e com isso vamos ao backend buscar os dados 
    atualizado do afiliado.*/
    const { tokenUser: tokenUser } = parseCookies(); //Pegando o token do afiliado
    if (tokenUser) {
      //Aqui dentro devo chamar minha api passando o token e recebendo as informacoes do afiliado
      apipublic
        .get(`user/${IdUser}`)
        .then((response) => {
          setUserCliente(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },[IdUser]);

  //Funcao de autenticacao para usuario
  async function signInUser({ email, senha }: signInData) {
    try {
      const response = await apiuser.post("loginuser/", {
        email,
        senha,
      });

      const { token, user } = response.data;
      
      //Aqui eu ja passo o token de validacao para minha api ja ficar com a informacao atualizada para realizar as requisicoes
      apiuser.defaults.headers["authorization"] = `Bearer ${token}`;
      
      //Aqui eu guardo o token do afiliado com um secao de 1hora
      const tokenExpirationTime = 60 * 60 * 1
      
      setCookie(undefined, "tokenUser", token, {
        maxAge: tokenExpirationTime, //1 hours //numeros em segundo para e expiracao do cookies(Secao)
      });
      
      setTimeout(() => {
        destroyCookie(undefined, "tokenUser", { path: "/" });
        setUserCliente(null);
        Router.push("/user/acess");
      }, tokenExpirationTime * 1000)
      
      const { tokenUser: tokenw } = parseCookies()

      //Aqui eu guardo os dados do usuario para utilizar na aplicacao
      setUserCliente(user);
      setCookie(undefined, "IdUser", user.id);
    
      
      // Agora adicionando uma pequena pausa antes de redirecionar
      setTimeout(() => {
        Router.push("/user/servicosOnline");
      }, 1000); // 100 milissegundos de pausa

    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const responseData = (error.response as { data: { error: string } })
          .data;
        if (responseData && responseData.error) {
          throw new Error("Erro ao fazer login, " + responseData.error);
        } else {
          throw new Error("Erro ao fazer login, " + error);
        }
      } else {
        throw new Error("Erro ao fazer login, " + error);
      }
      throw new Error(
        "Erro ao tentar se autenticar. Por favor, tente novamente.",
      );
      // Você pode querer mostrar uma mensagem de erro para o usuário aqui.
    }
  }



  //Funcao para sair do sistema e destroi o Token
  async function signOutUser() {
    destroyCookie(undefined, "tokenUser");
    destroyCookie(undefined, "IdUser");
    setUserCliente(null);
    Router.push("/user/acess");
  }

  return (
    <AuthUserContext.Provider value={{ userCliente,isAuthenticatedUser, signInUser, signOutUser }}>
      {children}
    </AuthUserContext.Provider>
  );
}