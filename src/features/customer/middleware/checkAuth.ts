import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../../services';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] || null;
    if (token) {
        verifyToken(token, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Failed to authenticate' });
            } else {
                req.body = {
                    auth: { accessToken: decoded.token },
                };
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
}
