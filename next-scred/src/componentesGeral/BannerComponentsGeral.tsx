interface BannerProps {
  texto?: string;
}

export default function BannerComponentsGeral({texto}: BannerProps) {
  return (
    <div className="min-h-full bg-blue-900 relativepx-6 py-3">
      <div className="mx-auto max-w-7xl">  
        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
          <strong className="font-semibold text-white text-lg">{texto}</strong>
        </div>
      </div>
    </div>

  )
}