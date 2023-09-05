
interface ButtonProps {
  nome: string;
  onClick: () => void;
  className?: string;
}


const ButtonComponent: React.FC<ButtonProps> = ({ nome, onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={`mt-2 border-2 rounded-2xl w-40 h-12 p-2 ${className}`}
    >
    {nome}
    </button>
  );
}

export default ButtonComponent;
