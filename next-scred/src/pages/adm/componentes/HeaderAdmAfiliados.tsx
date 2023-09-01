import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import logoimg from "../../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { CameraIcon } from "@heroicons/react/20/solid";
import { api } from "@/services/api";

function  classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface IAfiliado {
  foto?: string;
  nome?: string;
  email?: string;
  user_type?: string;
  // ... qualquer outra propriedade que você espera
}

export default function HeaderAdmAfiliado() {

  const router = useRouter();
  const { signOut } = useContext(AuthContext);
  const [afiliadoData, setAfiliadoData] = useState<IAfiliado | null>(null);

  //Assim que usuario fazer login eu faco uma requisao dos dados ao meu backend
  useEffect(() => {
    async function fetchAfiliado() {
      try {
        const response = await api.get("afiliado");
        setAfiliadoData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do afiliado:", error);
      }
    }
    fetchAfiliado();
  }, []);

  const { foto, nome, email, user_type } = afiliadoData || {};

  const navigation = [
    { name: "Home", href: "/adm/home", current: router.pathname === "/" },
    {name: "Processos",href: "/adm/request",current: router.pathname === "/request",},
    { name: "Afiliados", href: "/adm/signup", current: router.pathname === "/signup", visible: user_type === 'ADMIN' },
    {name: "Financeiro",href: "",current: router.pathname === "",},
  ];
  const visibleNavigation = navigation.filter(item => item.visible !== false);

  const userNavigation = [
    { name: "Meus dados", href: "/adm/account" },
    { name: "Sai da Plataforma", href: "#", onClick: signOut },
  ];

  

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className=" bg-blue-800 text-white font-roboto">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-24 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <Image
                        className="block h-16 w-auto lg:hidden"
                        src={logoimg}
                        alt="Your Company"
                        width={520}
                        height={480}
                      />
                      <Image
                        className="hidden h-16 w-auto lg:block"
                        src={logoimg}
                        alt="RC-Facil"
                        width={520}
                        height={480}
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {visibleNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "border-indigo-200 text-gray-100"
                              : "border-transparent hover:border-gray-300 hover:text-gray-200",
                            "inline-flex items-center border-b-2 px-1 pt-1",
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">
                            Abra o menu do usuário
                          </span>
                          {foto ? (
                            <Image
                              width={100}
                              height={100}
                              className="h-16 w-16 rounded-full"
                              src={foto}
                              alt=""
                            />
                          ) : (
                            <CameraIcon className="h-16 w-16" />
                          )}
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 
                              origin-top-right rounded-md bg-slate-100 py-1 shadow-lg ring-1
                              ring-slate-900 ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) =>
                                item.onClick ? (
                                  <button
                                    onClick={item.onClick}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-black",
                                    )}
                                  >
                                    {item.name}
                                  </button>
                                ) : (
                                  <Link
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-black",
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )
                              }
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <div className="ml-3">
                      <div className="text-sm  font-medium text-gray-100">
                        {nome}
                      </div>
                      <div className="text-xs mt-1 font-medium text-gray-200">
                        {email}
                      </div>
                      <div className="text-xs mt-1 font-medium text-gray-200">
                        {user_type}
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md  p-2 text-white hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Abra o menu do usuário</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-transparent text-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {foto ? (
                        <Image
                          width={100}
                          height={100}
                          className="h-14 w-14 rounded-full"
                          src={foto}
                          alt=""
                        />
                      ) : (
                        <CameraIcon className="h-10 w-10" />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-100">
                        {nome}
                      </div>
                      <div className="text-sm font-medium text-gray-200">
                        {email}
                      </div>
                    </div>
                   
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-100
                                   hover:bg-gray-100 hover:text-gray-500"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
