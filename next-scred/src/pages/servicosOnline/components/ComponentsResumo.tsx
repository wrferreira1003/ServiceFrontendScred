type ResumoProps = {
  data: Record<string, any>;
};

export default function ComponetsResumo({ data }: ResumoProps) {
 
  return (
    <div className="w-full">
      <div className="border-t px-4 sm:px-0">
        <h3 className="mt-5 text-base font-semibold leading-7 text-gray-900">
          Confira as Informações Pessoal
        </h3>
      </div>
      <div className="mt-6">
        <dl className="grid sm:grid-cols-6">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="border-t border-gray-100 px-4 sm:col-span-1 sm:px-0">
              <dt className="font-roboto text-sm font-bold leading-6 text-gray-900">
                {key}:
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-1">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}