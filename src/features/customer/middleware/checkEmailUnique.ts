import { NextFunction, Request, Response } from 'express';
import { APIResponse } from '../../../services';
import * as model from '../model';

export async function validateEmailUnique(
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

        const customer = await model.findCustomerByEmail(
            req.body.customer.email
        );
        if (customer) {
            res.status(409).json({
                code: 'features.customer.validate.body.error',
                message: 'Email already in use',
                args: {},
                data: {},
            } as APIResponse);
            return;
        }

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
