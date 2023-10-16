import { AuthContext } from '@/context/AuthContext';
import { useContext, useState} from 'react';
import { FaBabyCarriage,} from 'react-icons/fa';
import { BiLibrary, BiSolidFlorist, BiSolidSearch,} from 'react-icons/bi';
import { GiLinkedRings,} from 'react-icons/gi';
import CertidaoNascimento from '../CertidaoDeNascimento/CertidaoNascimento';
import CertidaoCasamento from '../CertidaoDeCasamento/CertidaoDeCasamento';
import CertidaoObito from '../CertidaoObito/CertidaoObito';
import BuscaRegistro from '../../buscaregistro/BuscaRegistro';
import DivorcioExtraJudicial from '../DivorcioExtraJudicial/DivorcioExtraJudicial';

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
    linkNovoPedido: <CertidaoCasamento />,
  },
  {
    id:3,
    name: 'Certidão de Óbito',
    imageUrl:
      <BiSolidFlorist size={30}/>,
    classNameBorder: 'border border-green-300',
    linkNovoPedido: <CertidaoObito />,
  },
  {
    id:4,
    name: 'Divorcio Extra Judicial',
    imageUrl:
      <BiLibrary size={30}/>,
    classNameBorder: 'border border-green-300',
    linkNovoPedido: <DivorcioExtraJudicial />,
  },
  {
    id:5,
    name: 'Buscar Registro',
    imageUrl:
      <BiSolidSearch size={30}/>,
    classNameBorder: 'border border-green-300',
    linkNovoPedido: <BuscaRegistro />,
  },
  
]

//Componente principal para os Servicos Cartorarios
export default function HomeCartorarios() {


  const [activeComponent, setActiveComponent] = useState<string | JSX.Element | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const { dataServico, selectService, setDataServicoAtual, dataServicoAtual } = useContext(AuthContext);

  const handleServiceClick = (serviceName: string) => {
    selectService(serviceName);
    
}
  return (
    <>
    <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-4">
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
                      shadow ${activeId === person.id ?  'bg-blue-500 text-white' : 'bg-blue-100'}`} 
          >
        <li
          className={`col-span-1 divide-y divide-gray-900 rounded-lg bg-transparent shadow`}>
          <div className="w-full items-center justify-between space-x-1 p-2">
            
            <div className="h-16 w-16 flex-shrink-0 rounded-full">
              {person.imageUrl}
            </div>
            <div className="flex-1">
              <div className={`flex items-center space-x-3
              ${activeId === person.id ?  'text-whithe' : 'text-slate-900'}`} 
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