import axios from "axios";
import { parseCookies } from 'nookies'
/* Quando a aplicacao iniciar se eu ja tiver o token no browser, quer dizer usuario logado
eu ja coloco esse token nas minhas solicitacoes para api */

const { 'tokenAfiliado': token  } = parseCookies() //Pegando o token do afiliado

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
})

/*criando um intercepto apenas para testar as informacoes que esta sendo enviada
dessa forma conseguimos verificar se o token esta sendo enviado */
api.interceptors.request.use(config =>{
  console.log(config)
  return config;
})

if (token) {
  api.defaults.headers['authorization'] = `Bearer ${token}`;
}


