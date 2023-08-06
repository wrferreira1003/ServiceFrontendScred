import React, { createContext, useContext, useState } from "react";

type FileContextType = {
  parentFiles: any[];
  setParentFiles: React.Dispatch<React.SetStateAction<any[]>>;
};

// Crie o contexto com um valor default (ele nunca será usado diretamente, só serve como um placeholder)
export const FileContext = createContext<FileContextType | undefined>(undefined);

// Crie um provider customizado
export const FileProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [parentFiles, setParentFiles] = useState<any[]>([]);

  return (
    <FileContext.Provider value={{ parentFiles, setParentFiles }}>
      {children}
    </FileContext.Provider>
  );
};

// Um hook customizado para usar o nosso contexto facilmente
export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext deve ser usado dentro de um FileProvider");
  }
  return context;
};
