import { createContext, use, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { api } from "@/services/api";

type useData = {
  name: string;
  razao_social: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  avatar: string;
  user_type: string;
};
type signInData = {
  email: string;
  senha: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: useData | null;
  signIn: (data: signInData) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  //Salvamos o usuario no estado, pois queremos sempre os dados mais atualizado possivel
  //se salvarmos nos cookies nao teremos os dados caso haja alguma alteracao
  const [user, setUser] = useState<useData | null>(null);

  //Usuario estara autenticado caso o user existir.
  const isAuthenticated = !!user;

  //Vamos criar um UseEffect para que os dados do afiliado sempre seja atualizado, assim
  //que o componente for atualizado
  useEffect(() => {
    /*Quando a componente que esta o provider for renderizado esse UseEffect vai verificar se existe um 
    cookie salvo, caso tenha sabemos que o usuario esta logado, e com isso vamos ao backend buscar os dados 
    atualizado do afiliado.*/
    const { tokenAfiliado: token } = parseCookies(); //Pegando o token do afiliado
    if (token) {
      //Aqui dentro devo chamar minha api passando o token e recebendo as informacoes do afiliado
      api
        .get("afiliado")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log("Erro no Contexto que atualiza o usuario", error);
        });
    }
  }, []);

  //Funcao de autenticacao
  async function signIn({ email, senha }: signInData) {
    try {
      const response = await api.post("login/", {
        email,
        senha,
      });

      const { token, user } = response.data;

      //Aqui eu guardo o token do afiliado com um secao de 1hora
      setCookie(undefined, "tokenAfiliado", token, {
        maxAge: 60 * 60 * 1, //1 hours //numeros em segundo para e expiracao do cookies(Secao)
      });
      //Aqui eu ja passo o token de validacao para minha api ja ficar com a informacao atualizada para realizar as requisicoes
      api.defaults.headers["authorization"] = `Bearer ${token}`;

      //Aqui eu guardo os dados do usuario para utilizar na aplicacao
      setUser(user);

      //Redirecionando caso tenha dado certo
      Router.push("/adm/home");
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
  async function signOut() {
    destroyCookie(undefined, "tokenAfiliado", { path: "/" });
    setUser(null);
    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
