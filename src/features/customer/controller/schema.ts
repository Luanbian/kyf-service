import { z } from 'zod';

export const customerSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
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
    interests: z.array(z.string()).min(1),
});

export const customerDiscordSchema = z.object({
    id: z.string(),
    username: z.string(),
    avatar: z.string().optional(),
    globalName: z.string().optional(),
    email: z.string().email().optional(),
    isFuriaGuild: z.boolean().optional(),
});

export const authSchema = z.object({
    accessToken: z.string(),
});

export type Customer = z.infer<typeof customerSchema>;
export type CustomerDiscord = z.infer<typeof customerDiscordSchema>;
