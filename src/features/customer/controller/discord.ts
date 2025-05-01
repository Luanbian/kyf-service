import debug from 'debug';
import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { APIResponse } from '../../../services';
import { checkAuth } from '../middleware/checkAuth';
import { authSchema } from './schema';
import { getCustomerDiscord } from '../useCase/getCustomer';

const logger = debug('features:customer:controller:discord');
const route = Router();

route.use(checkAuth);

route.get('/', async (req: Request, res: Response) => {
    try {
        const { accessToken } = req.body.auth as z.infer<typeof authSchema>;

        const customer = await getCustomerDiscord(accessToken);

        res.status(200).json({ message: JSON.stringify(customer) });
    } catch (error) {
        logger('Error in Get /customer/discord:', error);
        res.status(500).json({
            code: 'features.customer.discord.get.error',
            message: 'Error to get customer discord',
            args: error,
            data: {},
        } as APIResponse);
    }
});

export { route };
