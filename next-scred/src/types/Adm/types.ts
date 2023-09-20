export interface InfoDataType {
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
  foto: string
  user_type: string
  cpf: string
  last_login: string
}

interface DocumentoType {
  id?: number;
  descricao?: string;
  arquivo?: string;
  data_upload?: Date;
  cliente: number;
}

interface AfiliadoType {
  id?: number;
  nome?: string;
  telefone?: string;
}

export interface InfoDataTypeRequests{
  RegistroGeral?: string; 
  RegistroGeralEnvolvido?: string;
  afiliado?: AfiliadoType;
  bairro?: string;
  cep?: string;
  cidade?:string;
  cpf?: string;
  cpfEnvolvido?: string;
  data_nascimento?:Date
  data_pedido?:Date
  documentos?: DocumentoType[];
  email?:string
  endereco?:string
  estado?:string
  estadoCartorio?:string
  estadoCartorioFirmaReconhecida?:string
  estado_civil?: string
  folhaCartorio?:string
  id?:number
  idCliente?: string
  livroCartorio?: string
  livroCartorioFirmaReconhecida?: string
  nome?: string 
  nomeCartorio?: string
  nomeCartorioFirmaReconhecida?: string
  nomeEnvolvido?: string
  profissao?: string
  servico?:string
  sobrenome?:string
  sobrenomeEnvolvido?: string
  status?: string
  subservico?: string
  telefone?: string
} 
