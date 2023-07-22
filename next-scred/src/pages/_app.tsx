import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './Hcred/Home/Header'
import Footer from './Hcred/Home/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
  
        <Component {...pageProps} />
        

 
  )
}
