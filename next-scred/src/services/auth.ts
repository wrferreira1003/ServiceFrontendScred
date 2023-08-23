//Essa tela foi criada apenas para simular o servido para criacao da logica do login e senha 
//do afliado.

type signInRequestType = {
  email: string,
  password: string
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

//Esse exemplo eu crio uma rota onde ela recebe o login e senha caso esteja correto retorna o token e informacoes do afiliado
export async function signInRequest(data: signInRequestType){
  await delay()

  return {
    token: '1oo29938sndnidnrkfkrfoe9499405fkkskksksw',
    user:{
      name: 'Wellington Ferreira',
      razao_social: 'Filial-01 Marica',
      cnpj: '123.344.0001-02',
      email: 'wrf.wellington@gmail.com',
      telefone: '21-975875003',
      endereco: 'Rua B',
      bairro: 'São Jose do Imbassai',
      cidade: 'Marica',
      estado: 'Rio de Janeiro',
      cep: '24.930-024',
      avatar: 'https://github.com/wrferreira1003.png'

    }
  }
}
//Esse exemplo eu crio uma rota onde a obrigacao dela é receber o token e retornar os dados do afiliado
export async function recoverUserInformation(){
  await delay();
  return {
    user:{
      name: 'Wellington Ferreira',
      razao_social: 'Filial-01 Marica',
      cnpj: '123.344.0001-02',
      email: 'wrf.wellington@gmail.com',
      telefone: '21-975875003',
      endereco: 'Rua B',
      bairro: 'São Jose do Imbassai',
      cidade: 'Marica',
      estado: 'Rio de Janeiro',
      cep: '24.930-024',
      avatar: 'https://github.com/wrferreira1003.png'
    }
  }
}