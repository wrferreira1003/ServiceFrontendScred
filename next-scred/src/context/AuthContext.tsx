import { createContext, use, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { api, apiuser } from "@/services/api";
import { apipublic } from "@/services/apipublic";

type useData = {
  id:number
  nome: string;
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

interface ServicoType {
    id: number;
    nome_servico: string;
    tipo?: string;
    preco: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: useData | null;
  signIn: (data: signInData) => Promise<void>;
  signOut: () => Promise<void>;
  dataServico:ServicoType[]
  selectService: (serviceName: string) => void;
  selectedService: string | '' 
  dataServicoAtual: ServicoType | null;
  setDataServicoAtual: React.Dispatch<React.SetStateAction<ServicoType | null>>;
};


export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  //Salvamos o usuario no estado, pois queremos sempre os dados mais atualizado possivel
  //se salvarmos nos cookies nao teremos os dados caso haja alguma alteracao
  const [user, setUser] = useState<useData | null>(null);
  const [dataServico, setDataServico] = useState<ServicoType[]>([]);
  const [loadingServico, setLoadingServico] = useState(true);
  

  //Usuario estara autenticado caso o user existir.
  const isAuthenticated = !!user;

  //Carrega os dados dos servicos cadastrados no banco de dados
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await apipublic.get('categoria');
            setDataServico(response.data);
            setLoadingServico(false);
        } catch (error) {
            console.log(error);
            setLoadingServico(false);
        }
    };

    fetchData();
  }, []);

  //Vamos criar um UseEffect para que os dados do afiliado sempre seja atualizado, assim
  //que o componente for atualizado
  const [userChanged, setUserChanged] = useState(false);
  const onUserChanged = () => {
    setUserChanged(!userChanged);
  }
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
  }, [userChanged]);


  //Funcao de autenticacao Afiliado
  async function signIn({ email, senha }: signInData) {
     // 1. Verifique se o token já existe.
     const { tokenAfiliado } = parseCookies();

     // 2. Se existir, destrua-o.
     if (tokenAfiliado) {
       destroyCookie(undefined, "tokenAfiliado");

     }
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
      setUser(user)
      onUserChanged()
      //Redirecionando caso tenha dado certo
      Router.push("/adm/request");
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

  //********************************************************************************* */
  /* Aqui esta lidando como o servico, quando o cliente clica no servico no componente
  DropdowComponents, eu trago para ca o servico que foi clicado para comparar com os servicoes
  do banco de dados e trazer as informacoes do respectivo servico.*/
  const [selectedService, setSelectedService] = useState("");
  const [dataServicoAtual, setDataServicoAtual] = useState<ServicoType | null >(null);

  const selectService = (serviceName: string) => {
    setSelectedService(serviceName);
    const servicoFiltrado = dataServico.find(servico => servico.nome_servico === serviceName);
    setDataServicoAtual(servicoFiltrado || null)
  }
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        signIn, 
        signOut, 
        dataServico,
        
        selectService,
        selectedService,
        dataServicoAtual,
        setDataServicoAtual,

      }}>
      {children}
    </AuthContext.Provider>
  );
}
