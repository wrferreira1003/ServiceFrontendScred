import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

interface CarrinhoProps {
  id: number | undefined;
  servico: string | undefined;
  valor: string | undefined; 
  formaEntrega:string | undefined; 
  onSelectPaymentMethod:(paymentMethod: string | null) => void;
}


const paymentMethods = [
  { id: 'cartao', title: 'Cartão' },
  { id: 'pix', title: 'Pix' },
  { id: 'dinheiro', title: 'Dinheiro' },
]


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function CarrinhoComponent({id,servico, valor, formaEntrega,onSelectPaymentMethod}:CarrinhoProps) {
  const [open, setOpen] = useState(false)

  const defaultPaymentMethod = paymentMethods[1];

  useEffect(() => {
    handlePaymentMethod({ target: { id: defaultPaymentMethod.id } });
  }, []);

  const handlePaymentMethod = (e:any) =>{
    const payment = e.target.id;
    onSelectPaymentMethod(payment);
  }
  
  return (
    <div className="mt-10 w-full">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {servico}
                        </Tab>
                  
                    </Tab.List>
                  </div>
                </Tab.Group>              
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

    
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-14">
        <div className="mx-auto max-w-2xl lg:max-w-none">

          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Seu Carrinho</h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                    <li  className="flex px-4 py-6 sm:px-6">
                      <div className="ml-6 flex flex-1 flex-col">
                        
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <div className="font-medium text-gray-700 hover:text-gray-800">
                                <div className='flex flex-col mb-5'>
                                  <span className='font-bold'>Serviço</span> 
                                  <span>{servico}</span>
                                </div>
                              </div>
                            </h4>
                           </div>
                           
                        </div>
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <div className="font-medium text-gray-700 hover:text-gray-800">
                               <div className='flex flex-col'>
                               <span className='font-bold'>Forma de entrega</span> 
                               <span>{formaEntrega}</span>
                               </div>
                              </div>
                            </h4>
                           </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm text-gray-900">
                            <span className='font-bold'>ID: </span>
                            <span>{id}</span>
                          
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantidade
                            </label>
                            <select
                              id="quantity"
                              name="quantity"
                              className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value={1}>1</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Valor</dt>
                    <dd className="text-sm font-medium text-gray-900">{valor}</dd>
                  </div>
              
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxas</dt>
                    <dd className="text-sm font-medium text-gray-900">R$ 0</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">{valor}</dd>
                  </div>
                </dl>

                <div>
                  
                </div>
              </div>
            </div>
            <div>
              

              {/* Payment */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">Pagamento</h2>

                <fieldset className="mt-8">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                      <div key={paymentMethod.id} className="flex items-center">
                          <input
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            defaultChecked={paymentMethodIdx === 1}
                            onChange={handlePaymentMethod}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                      

                        <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                    
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </main>

    </div>
  )
}
