import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from './Hcred/Home/Footer'
import { AuthProvider } from '@/context/AuthContext'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <AuthProvider >
          <Component {...pageProps} />
        </AuthProvider>
        </div>
  <Footer />
</div>
        

 
  )
}
