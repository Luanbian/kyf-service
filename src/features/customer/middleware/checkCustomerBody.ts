import { NextFunction, Request, Response } from 'express';
import { APIResponse } from '../../../services';
import { customerSchema } from '../controller/schema';

export function validateCustomerBody(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({
                code: 'features.customer.validate.method.not.allowed',
                message: 'Method not allowed',
                args: {},
                data: {},
            } as APIResponse);
            return;
        }

        const validated = customerSchema.parse(req.body);
        req.body = { customer: validated };

        next();
    } catch (error) {
        res.status(400).json({
            code: 'features.customer.validate.body.error',
            message: 'Error to validate customer body',
            args: error,
            data: {},
        } as APIResponse);
    }
}
