import React from 'react';
import ReactLoading from 'react-loading';
import Image from "next/image";
import logoimg from "../assets/logo.png";

interface LoadingComponentProps {
    height?: string; // O "?" indica que essa propriedade é opcional
  }

export default function LoadingComponent({ height = "h-full" }: LoadingComponentProps) {
    return (
        <div className={`fixed top-0 left-0 w-full ${height} bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center`}>
            <div className="flex items-center justify-center min-h-screen relative">
                <Image 
                    src={logoimg} 
                    alt=""
                    width={50}
                    height={50} 
                    className="absolute w-20 h-20 rounded-full" />
                <ReactLoading type={'spin'} color={'#000000'} height={120} width={120} />
            </div>
        </div>
    );
}