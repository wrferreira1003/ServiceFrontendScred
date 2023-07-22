import HomeComponents from "./Hcred/Home";
import Footer from "./Hcred/Home/Footer";
import Header from "./Hcred/Home/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-auto pt-28">
        <Header />
        <HomeComponents />
        <Footer />
      </div>
    </div>
  )
}

