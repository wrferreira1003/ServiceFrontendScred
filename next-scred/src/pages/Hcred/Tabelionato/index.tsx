import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Tabelionato from "./Form";

export default function FormTabelionato(){
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-auto pt-28 flex-grow">
        <Header />
        <Tabelionato />
      </div>
      <Footer />
    </div>
)
}