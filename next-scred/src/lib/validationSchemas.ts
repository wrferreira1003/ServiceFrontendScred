import * as zod from "zod";

export const createUserSchema = zod.object({
  nome: zod
    .string()
    .nonempty({
      message: "O Nome é obrigatório",
    })
    .min(3, {
      message: "O Nome precisa ter no mínimo 3 caracteres",
    })
    .refine(name => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(name), {
      message: "O Nome não pode ser no formato de e-mail",
    }),

  sobrenome: zod
    .string()
    .nonempty({
      message: "O Sobrenome é obrigatório",
    })
    .min(3, {
      message: "O Sobrenome precisa ter no mínimo 3 caracteres",
    }),
    filiacao1: zod
    .string()
    .nonempty({
      message: "O Nome é obrigatório",
    })
    .min(3, {
      message: "O Nome precisa ter no mínimo 3 caracteres",
    }),

    filiacao2: zod
    .string()
    .nonempty({
      message: "O Nome é obrigatório",
    })
    .min(3, {
      message: "O Nome precisa ter no mínimo 3 caracteres",
    }),

  telefone: zod.string().refine(
    (value) => {
      const regex = /^\(?\d{2}\)? ?\d{5}-?\d{4}$/;
      return regex.test(value);
    },
    {
      message: "Número de telefone inválido, o formato correto é XX XXXXX-XXXX",
    },
  ),
  telefone2: zod.string(),

  nomeenvolvido: zod
    .string()
    .nonempty({
      message: "O Nome é obrigatório",
    })
    .min(3, {
      message: "O Nome precisa ter no mínimo 3 caracteres",
    }),

  sobrenomeenvolvido: zod
    .string()
    .nonempty({
      message: "O Sobrenome é obrigatório",
    })
    .min(3, {
      message: "O Sobrenome precisa ter no mínimo 3 caracteres",
    }),

  estadocivil: zod
    .string()
    .nonempty({
      message: "O Estado Civil é obrigatório",
    })
    .min(3, {
      message: "O Nome precisa ter no mínimo 3 caracteres",
    }),

  profissao: zod.string().nonempty({
    message: "A profissão é obrigatório",
  }),
  nascimento: zod.string().nonempty({
    message: "A data de nascimento é obrigatória",
  }),

  afiliado: zod
    .string()
    .nonempty({
      message: "Selecione um afiliado",
    })
    .refine((value) => value !== "" && value !== "Selecione a cidade", {
      message: "Selecione uma cidade",
    }),

  cidadeafiliado: zod
    .string()
    .nonempty({
      message: "Selecione uma cidade",
    })
    .refine((value) => value !== "" && value !== "Selecione o afiliado", {
      message: "Selecione o afiliado",
    }),
  idAfiliado: zod.number(),

  cartorio: zod.string().nonempty("Informar o nome do Cartório"),

  estadolivro: zod.string().nonempty("Informar o Estado do Registro"),

  livro: zod.string().nonempty("Informar o número do livro"),

  folha: zod.string().nonempty("Informar o número da folha"),
  
  termo: zod.string().nonempty("Informar o número do termo"),

  //Realizar as validacoes dos documentos
  rg: zod.string().nonempty({
    message: "O RG é obrigatório",
  }),

  cpf: zod
    .string()
    .nonempty("CPF não pode ser vazio")
    .refine((cpf) => cpf.length === 11, {
      message: "CPF precisa ter apenas números",
    }),

  cnpj: zod
    .string()
    .nonempty("CNPJ não pode ser vazio")
    .refine((cnpj) => cnpj.length === 14, {
      message: "CNPJ precisa ter apenas números",
    }),

  rgenvolvido: zod.string().nonempty({
    message: "O RG é obrigatório",
  }),

  cpfenvolvido: zod
    .string()
    .nonempty("CPF não pode ser vazio")
    .refine((cpf) => cpf.length === 11, {
      message: "CPF precisa ter apenas números",
    }),

  //Realizar as validacoes do Endereço
  estado: zod.string().nonempty({
    message: "Selecione o Estado",
  }),

  endereco: zod.string().nonempty({
    message: "Preencher o endereço",
  }),

  cidade: zod.string().nonempty({
    message: "Preencha com o nome da cidade",
  }),

  bairro: zod.string().nonempty({
    message: "Preencha com o nome do Bairro",
  }),
  cep: zod.string()
        .nonempty("CEP não pode ser vazio")
        .refine((cep) => cep.length === 8, {
        message: "CEP precisa ter apenas números e 8 Dígitos",
  }),
  complemento: zod.string(),

  numero: zod.string().nonempty({
    message: "Preencha o numero da residencia"
  }),
  
  logradouro: zod.string().nonempty({
    message: "Preencha o Logradouro"
  }),

  cidadeCartorio: zod.string().nonempty({
    message: "Preencha com o nome da cidade do Cartório",
  }),

  estadoCartorio: zod.string().nonempty({
    message: "Selecione o Estado do Cartório",
  }),
  user_type: zod.string(),
  //Realizar as validacoes dos dados aqui.
  fileUpload: zod.any(),
  // Todo: Criar as validacoes necessaria para os arquivos upload.

  //Apenas para o cadastro de usuarios
  userType: zod.enum(['ADM', 'AFILIADO']),
  CPFSigup: zod.string().optional(),
  CNPJSigup: zod.string().optional(),

  cpfUsuario: zod
    .string()
    .nonempty("CPF não pode ser vazio")
    .refine((cpf) => cpf.length <= 14, {
      message: "CPF precisa ter apenas números",
    }),

  razao_social: zod.string(),

  password: zod
    .string()
    .min(8, {
      message: "A senha precisa ter no mínimo 8 caracteres",
    })
    .nonempty({
      message: "A senha é obrigatório",
    }),
    
    confirmapassword: zod
    .string()
    .min(8, {
      message: "A senha precisa ter no mínimo 8 caracteres",
    })
    .nonempty({
      message: "A confirmaão da senha é obrigatório",
    }),

  email: zod
    .string()
    .nonempty({
      message: "O Email é obrigatório",
    })
    .email({
      message: "Formato de e-mail inválido",
    }),

  confirmaemail: zod
    .string()
    .nonempty({
      message: "A confimação do Email é obrigatório",
    })
    .email({
      message: "Formato de e-mail inválido",
    }),
    conjugue1: zod
    .string()
    .nonempty({
      message: "O Nome é obrigatório",
    })
    .min(3, {
      message: "O Nome precisa ter no mínimo 3 caracteres",
    }),
    conjugue2: zod
    .string()
    .nonempty({
      message: "O Nome é obrigatório",
    })
    .min(3, {
      message: "O Nome precisa ter no mínimo 3 caracteres",
    }),
    DtCasamento: zod.string().nonempty({
      message: "A data de casamento é obrigatória",
    }),
    DtObito: zod.string().nonempty({
      message: "A data do Óbito é obrigatória",
    }),
    Dtinicial: zod.string().nonempty({
      message: "A data inicial é obrigatória",
    }),
    Dtfinal: zod.string().nonempty({
      message: "A data final é obrigatória",
    }),

    
    nome_falecido: zod
    .string()
    .nonempty({
      message: "O Nome do falecido é obrigatório",
    })
    .min(3, {
      message: "O Nome precisa ter no mínimo 3 caracteres",
    })
    .refine(name => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(name), {
      message: "O Nome não pode ser no formato de e-mail",
    }),
    temFilhosMenores: zod
    .string(),
    temBens: zod
    .string(),
    filhoIncapaz: zod
    .string(),

})

