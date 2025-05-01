import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants';

export const signToken = (data: string) =>
    jwt.sign({ token: data }, JWT_SECRET, { expiresIn: '24h' });

export const verifyToken = (
    token: string,
    cb: (err: any, decoded: any) => void
) => jwt.verify(token, JWT_SECRET, cb);
