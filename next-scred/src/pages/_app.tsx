import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from './Hcred/Home/Footer'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
    <div className="flex-grow">
        <Component {...pageProps} />
        </div>
  <Footer />
</div>
        

 
  )
}
