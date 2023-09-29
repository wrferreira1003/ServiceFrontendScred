
interface ButtonProps {
  nome: string;
  onClick: () => void;
  className?: string;
}


const ButtonComponent: React.FC<ButtonProps> = ({ nome, onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={`border-2 rounded-md w-40 h-12 p-2 inline-flex items-center justify-center gap-x-2 bg-indigo-600 
      px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
     focus-visible:outline-indigo-600 ${className}`}
    >
    {nome}
    </button>
  );
}

export default ButtonComponent;
