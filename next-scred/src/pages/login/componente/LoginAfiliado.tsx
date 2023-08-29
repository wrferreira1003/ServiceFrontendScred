import Image from "next/image";
import logoimg from "../../../assets/logo.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

type usersType = {
  email: string;
  senha: string;
};

export default function LoginAfiliado() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignIn(data: any) {
    try {
      await signIn(data);
      setLoginError(null); // Limpa qualquer erro anterior
    } catch (error) {
      const err = error as { message?: string };
      setLoginError(err.message || "Ocorreu um erro durante o login.");
    }
  }

  return (
    <div className=" flex flex-col md:flex-row h-screen gap-10 items-center justify-center bg-blue-800">
      <div className="flex flex-col items-center justify-center">
        
        <Image
          className="h-48 w-auto"
          src={logoimg}
          width={520}
          height={480}
          alt=""
        />

        <h1 className="mr-2 ml-2 mt-10 text-3xl font-roboto text-center break-words text-white">
            Faça seu login na plataforma
        </h1>
      </div>
      
      <div className="mt-12 rounded-xl bg-white p-8 sm:w-full sm:max-w-sm">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
                            sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
               
              </div>
              <div className="relative mt-2">
                <input
                  {...register("senha")}
                  id="senha"
                  name="senha"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-2 py-1.5 
                            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
                            sm:leading-6"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                >
                  {showPassword ? (
                    <span>🙈</span> // ícone de "esconder senha"
                  ) : (
                    <span>👁️</span> // ícone de "mostrar senha"
                  )}
                </div>
              </div>
            </div>
            {loginError && (
              <div className="mt-2 text-center text-xs text-red-500">
                {loginError}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ENTRAR
              </button>
            </div>
            <div className="text-sm text-center"> 
                  <Link
                    href="ForgotPassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
          </form>
        </div>
      </div>
    </div>
  );
}
