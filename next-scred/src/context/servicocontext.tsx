import { useApi } from "@/hooks/useApi";
import { InfoDataTypeRequests } from "@/types/Adm/types";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

interface ServicoContextType {
  servico: string | null;
  setServico: Dispatch<SetStateAction<string | null>>;
  subservico: string | null;
  setSubServico: Dispatch<SetStateAction<string | null>>;
}

const ServicoContext = createContext<ServicoContextType>({
  servico: null,
  setServico: () => {},
  subservico: null,
  setSubServico: () => {},
});

export function useServico() {
  return useContext(ServicoContext);
}

interface ProviderProps {
  children: ReactNode;
}

export function ServicoProvider({ children }: ProviderProps) {
  const [servico, setServico] = useState<string | null>(null);
  const [subservico, setSubServico] = useState<string | null>(null);
  
  
  const value = {
    servico,
    setServico,
    subservico,
    setSubServico,
  };

  return (
    <ServicoContext.Provider value={value}>{children}</ServicoContext.Provider>
  );
}
