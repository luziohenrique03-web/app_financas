import { z } from "zod";

export const transactionSchema = z.object({
  description: z.string().trim().min(1, "Informe uma descrição.").max(200),
  amount: z.coerce
    .number({ error: "Informe um valor válido." })
    .positive("O valor deve ser maior que zero."),
  date: z.string().min(1, "Informe uma data."),
  type: z.enum(["income", "expense"], { error: "Selecione o tipo." }),
  category_id: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().uuid().nullable().optional()
  ),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;

export const authSchema = z.object({
  email: z.email({ error: "Informe um e-mail válido." }),
  password: z.string().min(6, "A senha deve ter ao menos 6 caracteres."),
});

export type AuthFormValues = z.infer<typeof authSchema>;
