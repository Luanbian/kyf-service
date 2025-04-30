export interface APIEcho {
    server: string;
    version: string;
}

export interface APIResponse<T = unknown, E = any> {
    code: string;
    message: string;
    args?: E;
    data?: T;
}

declare module 'express-session' {
    interface SessionData {
        discordState?: string;
        code?: string;
    }
}
