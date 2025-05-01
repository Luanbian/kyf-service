import debug from 'debug';
import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { APIResponse } from '../../../services';
import { checkAuth } from '../middleware/checkAuth';
import { authSchema } from './schema';
import { getCustomerDiscord } from '../useCase/getCustomer';
import * as model from '../model';

const logger = debug('features:customer:controller:discord');
const route = Router();

route.use(checkAuth);

route.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const { accessToken } = req.body.auth as z.infer<typeof authSchema>;

        const customer = await getCustomerDiscord(accessToken);
        if (!customer) {
            res.status(404).json({
                code: 'features.customer.discord.get.notfound',
                message: 'Customer discord not found',
                args: {},
                data: {},
            } as APIResponse);
            return;
        }

        await model.updateDiscord({ id, discord: customer });

        res.status(200).json({
            code: 'features.customer.discord.put.success',
            message: 'Customer discord updated successfully',
            args: {},
            data: {},
        } as APIResponse);
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
