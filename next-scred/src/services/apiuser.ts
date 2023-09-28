import axios from 'axios'
import { parseCookies } from 'nookies'
import Router from 'next/router'

export function getApiClientUser(ctx?: any) {
  const { tokenUser: token } = parseCookies(ctx); // Pegando o token do usuário
  
  const apiuser = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
  });

  if (token) {
    apiuser.defaults.headers["Authorization"] = `Bearer ${token}`
  }

  apiuser.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response?.status === 401) {
      // Token expirou ou não é válido
      Router.push('/user/acess'); // redireciona para a página de login
    }

    return Promise.reject(error);
  });

  return apiuser;
}

