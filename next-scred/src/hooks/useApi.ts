import userSWR from 'swr'
import { apipublic } from '@/services/apipublic';

export function useApi(url:string | null) {
  const {data, error, mutate} = userSWR(url, async(url) =>{
    const {data} = await apipublic.get(url)

    return data
  })
  return {data, error, mutate}
}