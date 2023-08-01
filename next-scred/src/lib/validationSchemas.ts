import * as zod from 'zod'

export const createUserSchema = zod.object({
  nome: zod.string().nonempty({
    message: 'O Nome é obrigatório',
  }).min(3,{
    message: 'O Nome precisa ter no mínimo 3 caracteres'
  }),

  sobrenome: zod.string().nonempty({
    message: 'O Sobrenome é obrigatório',
  }).min(3,{
    message: 'O Sobrenome precisa ter no mínimo 3 caracteres'
  }),

  email: zod.string().nonempty({
    message: 'O Email é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  }),
  telefone: zod.string().refine(value => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(value);
  }, {
    message:'Número de telefone inválido, o formato correto é (XX) XXXXX-XXXX',
  }),

  nomeenvolvido: zod.string().nonempty({
    message: 'O Nome é obrigatório',
  }).min(3,{
    message: 'O Nome precisa ter no mínimo 3 caracteres'
  }),

  sobrenomeenvolvido: zod.string().nonempty({
    message: 'O Sobrenome é obrigatório',
  }).min(3,{
    message: 'O Sobrenome precisa ter no mínimo 3 caracteres'
  }),
});