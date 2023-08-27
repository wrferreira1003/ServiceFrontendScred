import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "./Hcred/Home/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </div>
      <Footer />
    </div>
  );
}
