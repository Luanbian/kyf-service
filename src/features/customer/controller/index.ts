import Router from 'express';
import { route as discordRouter } from './discord';
import { route as coreRouter } from './core';

const router = Router();

router.use('/customer', coreRouter);
router.use('/customer/discord', discordRouter);

export { router };
