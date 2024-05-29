import * as z from "zod";

export const FormSchema = z
  .object({
    nome: z.string().min(1, { message: "Informe seu nome" }),
    email: z
      .string()
      .min(1, { message: "Informe seu e-mail" })
      .email({ message: "Por favor, informe um e-mail válido" }),
    telefone: z.string().min(1, { message: "Informe seu telefone" }),
    preferenciaLigacao: z.boolean(),
    preferenciaWhatsapp: z.boolean(),
    preferenciaEmail: z.boolean(),
    cep: z
      .string()
      .min(1, { message: "Informe seu CEP" })
      .min(9, { message: "Informe um CEP válido" })
      .max(9, { message: "Informe um CEP válido" }),
    logradouro: z.string().min(1, { message: "Informe seu logradouro" }),
    numero: z.string().min(1, { message: "Informe o número do seu endereço" }),
    bairro: z.string().min(1, { message: "Informe seu bairro" }),
    complemento: z.string().optional(),
    cidade: z.string().min(1, { message: "Informe a cidade do seu endereço" }),
    estado: z.string().min(1, { message: "Informe o estado do seu endereço" }),
    objetivoProjeto: z
      .string()
      .min(1, { message: "Informe o objetivo do projeto" }),
  })
  .transform((field) => ({
    nome: field.nome,
    email: field.email,
    telefone: field.telefone,
    preferenciaLigacao: field.preferenciaLigacao,
    preferenciaWhatsapp: field.preferenciaWhatsapp,
    preferenciaEmail: field.preferenciaEmail,
    cep: field.cep,
    logradouro: field.logradouro,
    numero: field.numero,
    bairro: field.bairro,
    complemento: field.complemento,
    cidade: field.cidade,
    estado: field.estado,
    objetivoProjeto: field.objetivoProjeto,
  }));
