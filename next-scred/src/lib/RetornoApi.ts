type FormData = {
  nome: string;
  email: string;
  telefone: string;
  estado: string;
  endereco: string;
  cidade: string;
  bairro: string;
  cep: string;
  user_type: string;
  cpfUsuario: string;  // Aqui o "?" indica que é opcional
  cnpj: string;        // Incluímos cnpj como opcional também
  razao_social: string;
  [key: string]: string;
};

type ErrorMappings = {
  [key: string]: string | string[];
};

export function handleApiErrors(err: any) {
  const errorMappings: ErrorMappings = {
      'nome': 'Nome inválido.',
      'email': 'Email já cadastrado',
      'telefone': 'Telefone inválido.',
      'estado': 'Estado inválido.',
      'endereco': 'Endereço inválido.',
      'cidade': 'Cidade inválida.',
      'bairro': 'Bairro inválido.',
      'cep': 'CEP inválido.',
      'user_type': ',Tipo de Função inválida.', // você pode adicionar outras mensagens de erro
      'cpfUsuario': 'CPF inválido.',
      'cnpj': 'CNPJ inválido.',
      'razao_social': 'Razão social inválida.',
  };

  if (err.response && err.response.status === 400) {
    let errorMessages = [];

    for (let field in errorMappings) {
        if (err.response.data[field]) {
            const customErrorMessage = Array.isArray(err.response.data[field]) ? 
                err.response.data[field].join(', ') : 
                errorMappings[field];

            errorMessages.push(customErrorMessage);
        }
    }

    return errorMessages.join('\n');
} else { 
    return 'Ocorreu um erro inesperado.';
}
}

