import debug from 'debug';
import { Request, Response, Router } from 'express';
import { APIResponse } from '../../../services';
import { validateCustomerBody } from '../middleware/checkCustomerBody';
import { Customer } from './schema';

const logger = debug('features:customer:controller:core');
const route = Router();

route.post('/', validateCustomerBody, async (req: Request, res: Response) => {
    try {
        const { customer } = req.body as { customer: Customer };
        console.log(customer);

        res.status(200).json({ message: 'Ok' });
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
