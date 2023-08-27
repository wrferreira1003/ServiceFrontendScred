import axios from 'axios'
import { parseCookies } from 'nookies'

export function getApiClient(ctx?: any) {
  const { tokenAfiliado: token } = parseCookies(ctx); //Pegando o token do afiliado

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
  });
  /*criando um intercepto apenas para testar as informacoes que esta sendo enviada
  dessa forma conseguimos verificar se o token esta sendo enviado */
  api.interceptors.request.use((config) => {
    return config
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`
  }

  return api
}
