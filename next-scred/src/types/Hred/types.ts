export interface ApiAfiliados {
  id: number
  nome: string
  razao_social: string
  cnpj: string
  email: string
  telefone: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

export type combineData = {
  [key: string]: any;
  nome?: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  RegistroGeral?: string;
  cpf?: string;
  estado_civil?: string;
  profissao?: string;
  data_nascimento?: string;
  estado?: string;
  endereco?: string;
  cidade?: string;
  bairro?: string;
  cep?: string;
  afiliado?: number | undefined;
  servico?: string | null;
  subservico?: string | null;
  nomeEnvolvido?: string;
  sobrenomeEnvolvido?: string;
  RegistroGeralEnvolvido?: string;
  cpfEnvolvido?: string;
  nomeCartorio?: string;
  estadoCartorio?: string;
  livroCartorio?: string;
  folhaCartorio?: string;
  nomeCartorioFirmaReconhecida?: string;
  estadoCartorioFirmaReconhecida?: string;
  livroCartorioFirmaReconhecida?: string;
  documentos: Array<{ arquivo: File; descricao: string }>;
  filiacao1?: string,
  filiacao2?: string,
};

export interface FormularioDadosPessoal {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  nomeenvolvido: string;
  sobrenomeenvolvido: string;
}
export interface FormularioEndereco {
  estado: string;
  endereco: string;
  cidade: string;
  bairro: string;
  cep: string;
}

export interface FormularioDocumentos {
  rg: string;
  cpf: string;
  rgenvolvido: string;
  cpfenvolvido: string;
  fileUpload: any;
}

export interface FormularioAfiliados {
  cidadeafiliado: string;
  afiliado: string;
  afiliadoId: number;
}

interface CreateUserData {
  fileUpload: {
    type: string;
    size: number;
  }[];
}

export interface FormularioCartorio {
  cartorio: string;
  estadolivro: string;
  livro: string;
  folha: string;
}
export type FileData = {
  error: boolean;
  file: File;
  id: string;
  name: string;
  preview: string;
  progress: number;
  readaSize: string;
  upload: boolean;
  url: string | null;
};
