import axios from 'axios'
import { parseCookies } from 'nookies'

export function getApiClientUser(ctx?: any) {
  const { tokenUser: token } = parseCookies(ctx); //Pegando o token do afiliado
  
  const apiuser = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
  });

  if (token) {
    apiuser.defaults.headers["Authorization"] = `Bearer ${token}`
    
  }

  return apiuser
}