export default function Footer(){
  return (
    <footer className="bg-slate-100 w-full">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © Copyright 2023 All Rights Reserved by
        <a href="" className="hover:underline">
        .  WRFERREIRA DEV PRO.
        </a>
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">Sobre</a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">Política de Privacidade</a>
        </li>
        <li>
          <a href="#" className="hover:underline">Contato</a>
        </li>
      </ul>
    </div>
  </footer>
    )
}