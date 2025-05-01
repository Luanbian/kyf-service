import { z } from 'zod';

export const customerSchema = z.object({
    id: z.string(),
    username: z.string(),
    avatar: z.string(),
    globalName: z.string(),
    email: z.string().email(),
    isFuriaGuild: z.boolean(),
});

export const authSchema = z.object({
    accessToken: z.string(),
});

export type Customer = z.infer<typeof customerSchema>;
