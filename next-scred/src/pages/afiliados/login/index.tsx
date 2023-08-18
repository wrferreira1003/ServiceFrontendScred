import Image from "next/image";
import logoimg from '../../../assets/logo.png';
import Link from "next/link";

export default function LoginAfiliado(){
  return (
  
    <div className="h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white rounded-xl p-8 sm:w-full sm:max-w-sm mt-12">
        <div className="flex flex-col items-center mt-2">
          <Image className="h-12 w-auto" 
                    src={logoimg}
                    width={520} 
                    height={480} alt="" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-8">
        
          <h4 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-500">
            ÁREA DOS AFILIADOS
          </h4>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                            p-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                            p-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              
              {/*Campo criado apenas para acessar sem esta logado */ }
              <div className="py-6">
                <Link
                  href="/afiliados/home"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Entrar
                
                </Link>
              </div>
            
            </div>
          </form>
        </div>
      </div>
    </div>
)
}