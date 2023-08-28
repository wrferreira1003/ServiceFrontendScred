import React from 'react';
import ReactLoading from 'react-loading';
import Image from "next/image";
import logoimg from "../assets/logo.png";

export default function LoadingComponent() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
            <div className="flex items-center justify-center min-h-screen relative">
                <Image 
                    src={logoimg} 
                    alt=""
                    width={70}
                    height={70} 
                    className="absolute w-28 h-28 rounded-full" />
                <ReactLoading type={'spin'} color={'#000000'} height={100} width={100} />
            </div>
            </div>
        </div>
    );
}