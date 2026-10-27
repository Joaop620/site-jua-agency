import { z } from "zod";
import { formServices } from "@/content/site";

export const contactSchema = z.object({
  nome: z.string().trim().min(1, "Conta pra gente como te chamar.").max(120),
  email: z.string().trim().email("Esse e-mail não parece válido.").max(200),
  empresa: z.string().trim().max(200).optional().default(""),
  servicos: z.array(z.enum(formServices as [string, ...string[]])).max(formServices.length).default([]),
  mensagem: z.string().trim().max(4000).optional().default(""),
  // honeypot: precisa chegar vazio
  site: z.string().max(500).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
