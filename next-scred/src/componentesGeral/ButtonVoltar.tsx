import { useRouter } from 'next/router'

interface ButtonToGoBackProps {
  route: string;
}

export default function ButtonToGoBack({route}: ButtonToGoBackProps) {
  const router = useRouter();

  const handleConfirm = () => {
    router.push(route)
  }

  return(
    <button
            onClick={handleConfirm} 
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold
                       text-white shadow-sm hover:bg-gray-700 focus-visible:outline 
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Voltar <span aria-hidden="true"></span>
          </button>
  )
}