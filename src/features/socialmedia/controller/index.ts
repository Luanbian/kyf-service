import Router from 'express';
import { route as authRouter } from './auth';

const router = Router();

router.use('/discord', authRouter);

export { router };
