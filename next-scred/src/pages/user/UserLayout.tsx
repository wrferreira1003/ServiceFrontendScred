import { ReactNode, useContext } from "react";
import Header from "../Hcred/Home/Header";
import BannerComponents from "../servicosOnline/components/bannerComponents";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";


type UserLayoutProps = {
  children: ReactNode;
}

export default function UserLayout({children}:UserLayoutProps){

  return (
    <div className="mb-auto flex-grow pt-28 relative">
      <div className="sticky top-0 z-50 bg-white">
        <Header />
        <BannerComponents />
      </div>
      {children}
    </div>
  )
}
