import debug from 'debug';
import { Request, Response, Router } from 'express';
import { APIResponse, InsertOneResult } from '../../../services';
import { validateCustomerBody } from '../middleware/checkCustomerBody';
import { Customer } from './schema';
import * as model from '../model';

const logger = debug('features:customer:controller:core');
const route = Router();

route.post('/', validateCustomerBody, async (req: Request, res: Response) => {
    try {
        const { customer } = req.body as { customer: Customer };

        const insertedCustomer = await model.createCustomer({ customer });

        res.status(200).json({
            code: 'features.customer.core.create.success',
            message: 'Customer created successfully',
            args: {},
            data: insertedCustomer,
        } as APIResponse<InsertOneResult<model.CustomersDocument>>);
    } catch (error) {
        logger('Error in Get /customer:', error);
        res.status(500).json({
            code: 'features.customer.core.get.error',
            message: 'Error to get customer',
            args: error,
            data: {},
        } as APIResponse);
    }
});

export { route };
