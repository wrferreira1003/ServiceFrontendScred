/*
Consolidacao de todos os sevicos que e usando na aplicacao, o Id precisa ser igual ao Nome Servico do servidor, cada servico
que e adicionado precisa ter o mesmo servico no servidor para conseguir buscar as informacoes adicionais, a categoria precisa
ser igual ao filtro dos componentes que usam os mesmos.
*/

export const ConsolidadoServicos = [
  //Componente de Certidao de nascimento
  { id: 'Certidão de Nascimento', title: 'Certidão de Nascimento', categoria: 'Certidão de Nascimento'},
  { id: 'Retificação de Certidão de Nascimento', title: 'Retificação de Certidão de Nascimento', categoria: 'Certidão de Nascimento' },
  { id: 'Restauração de Certidão de Nascimento', title: 'Restauração de Certidão de Nascimento', categoria: 'Certidão de Nascimento' },
  { id: 'Averbação de Certidão de Nascimento', title: 'Averbação de Certidão de Nascimento', categoria: 'Certidão de Nascimento' },

  //Componente de Certidao de casamento
  { id: 'Certidão de Casamento', title: 'Certidão de Casamento', categoria: 'Certidão de Casamento'},
  { id: 'Retificação de Certidão de Casamento', title: 'Retificação de Certidão de Casamento', categoria: 'Certidão de Casamento' },
  { id: 'Restauração de Certidão de Casamento', title: 'Restauração de Certidão de Casamento', categoria: 'Certidão de Casamento' },
  { id: 'Averbação de Certidão de Casamento', title: 'Averbação de Certidão de Casamento', categoria: 'Certidão de Casamento' },

  //Componente de Certidao de Obito
  { id: 'Certidão de Óbito', title: 'Certidão de Óbito', categoria: 'Certidão de óbito'},
  { id: 'Retificação de Certidão de Óbito', title: 'Retificação de Certidão de Óbito', categoria: 'Certidão de óbito' },
  { id: 'Restauração de Certidão de Óbito', title: 'Restauração de Certidão de Óbito', categoria: 'Certidão de óbito' },
  { id: 'Averbação de Certidão de Óbito', title: 'Averbação de Certidão de Óbito', categoria: 'Certidão de óbito' },
  
  //Componente de Buscar registro
  { id: 'Nascimento / Transcrição de nascimento', title: 'Nascimento / Transcrição de nascimento',categoria: 'Busca Registro' },
  { id: 'Casamento / Transcrição de casamento', title: 'Casamento / Transcrição de casamento',categoria: 'Busca Registro'},
  { id: 'Óbito / Transcrição de óbito', title: 'Óbito / Transcrição de óbito', categoria:'Busca Registro' },

  //Componente de Buscar registro
  { id: 'Divórcio extrajudicial', title: 'Divórcio extrajudicial',categoria: 'Divórcio extrajudicial' },

]