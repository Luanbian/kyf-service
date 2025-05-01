import { z } from 'zod';

export const DocumentSchema = z
    .object({
        cpf: z.string(),
    })
    .optional();

export type CustomerDocuments = z.infer<typeof DocumentSchema>;
