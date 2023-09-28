import axios from 'axios'
import { parseCookies } from 'nookies'
import Router from 'next/router'

export function getApiClient(ctx?: any) {
  const { tokenAfiliado: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
  });
 
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`
  }

  api.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response?.status === 401) {
      // Token expirou ou não é válido
      Router.push('/login'); // redireciona para a página de login
    }

    return Promise.reject(error);
  });

  return api;
}
