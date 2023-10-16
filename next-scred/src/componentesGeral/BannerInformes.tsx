
interface textType{
  texto: string;
}

export default function BannerInformeComponents({texto}: textType) {
  return (
    <div className="mt-5 w-full rounded-lg flex gap-x-6 bg-indigo-500 px-2 py-2.5">
        <p className="text-sm leading-6 text-white">
            {texto}
        </p>
    </div>
  )
}
