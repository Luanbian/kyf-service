import { z } from 'zod';
import { ObjectId } from '../../../services';
import { DocumentSchema } from '../../documents/model/schema';

export const COLLECTION_CUSTOMERS = 'customers';

export const CustomerDiscordSchema = z
    .object({
        id: z.string(),
        username: z.string(),
        avatar: z.string().optional(),
        globalName: z.string().optional(),
        email: z.string().email().optional(),
        isFuriaGuild: z.boolean().optional(),
    })
    .optional();

export const CustomerSchema = z.object({
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    cpf: z.string(),
    birthDate: z.string(),
    adress: z
        .object({
            street: z.string(),
            number: z.string(),
            complement: z.string().optional(),
            city: z.string(),
            state: z.string(),
            zipCode: z.string(),
        })
        .optional(),
    interests: z.array(z.string()),
    discord: CustomerDiscordSchema,
    documents: DocumentSchema,
});

export type Customers = z.infer<typeof CustomerSchema>;
export type CustomerDiscord = z.infer<typeof CustomerDiscordSchema>;
export type CustomersDocument = Customers & { _id?: string | ObjectId };
