import axios from 'axios'
import { api_servidor } from './url';

export const apipublic = axios.create({
  baseURL: api_servidor,
});
