import axios from 'axios'
import { parseCookies } from 'nookies'

export function getApiClient(ctx?: any) {
  const { tokenAfiliado: token } = parseCookies(ctx); 
  //Pegando o token do afiliado

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
  });
 
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`
    
  }

  return api
}
