import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useContext, useState} from 'react';
import { FaBabyCarriage,} from 'react-icons/fa';
import { BiSolidFlorist,} from 'react-icons/bi';
import { GiLinkedRings,} from 'react-icons/gi';
import CertidaoNascimento from '../CertidaoDeNascimento/CertidaoNascimento';

interface ServicoType {
  id: number;
  nome_categoria: string;
  servicos:{
    id: number;
    nome_servico: string;
    tipo?: string;
    preco: string;
  }
}
//Cadastrar os Servicos
const people = [
  {
    id:1,
    name: 'Certidão de Nascimento',
    imageUrl:
    <FaBabyCarriage size={30} />,
    classNameBorder: 'border border-red-300',
    linkNovoPedido: <CertidaoNascimento />,
  },
  {
    id:2,
    name: 'Certidão de Casamento',
    imageUrl:
      <GiLinkedRings size={30} />,
    classNameBorder: 'border border-green-300',
    linkNovoPedido: '',
  },
  {
    id:3,
    name: 'Certidão de Óbito',
    imageUrl:
      <BiSolidFlorist size={30}/>,
    classNameBorder: 'border border-green-300',
    linkNovoPedido: '',
  }
]

//Componente principal para os Servicos Cartorarios
export default function HomeCartorarios() {

  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState<string | JSX.Element | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const { dataServico, selectService, setDataServicoAtual, dataServicoAtual } = useContext(AuthContext);

  const handleServiceClick = (serviceName: string) => {
    selectService(serviceName);
    
}
  return (
    <>
    <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <div 
          key={person.id} 
          onClick={() => {
            if (activeId === person.id) {
              handleServiceClick(person.name)
              setActiveComponent(null);
              setActiveId(null);
              setDataServicoAtual(null);
            } else {
              handleServiceClick(person.name)
              setActiveComponent(person.linkNovoPedido);
              setActiveId(person.id);
            }
            }}
          className={`col-span-1 divide-y divide-gray-900 rounded-lg 
                      bg-transparent shadow ${activeId === person.id ?  'bg-blue-400 text-white' : 'bg-blue-100'}`} 
          >
        <li
          className={`col-span-1 divide-y divide-gray-900 rounded-lg bg-transparent shadow`}>
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            
            <div className="h-16 w-16 flex-shrink-0 rounded-full">
              {person.imageUrl}
            </div>
            <div className="flex-1">
              <div className={`flex items-center space-x-3
              ${activeId === person.id ?  'text-white' : 'text-slate-900'}`} 
              >
                <h1 className="runcate text-1xl font-bold text-w break-all ">
                  {person.name}
                </h1>
              </div>
            </div>
            
          </div>
        <div>
        </div>
          
        </li>
        </div>
      ))}
    </ul>
    <div>
    {activeComponent} 
    </div>
    </>
    
  )
}