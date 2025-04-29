import debug from 'debug';
import { z } from 'zod';
import { Router } from 'express';
import { APIResponse, recognizeTextFromFile } from '../../../services';
import { uploadMiddleware } from '../middleware/upload';
import { fileSchema } from './schemas';

const logger = debug('features:documents:controller:core');
const route = Router();

route.post('/', uploadMiddleware, async (req, res) => {
    try {
        const { path } = req.file as z.infer<typeof fileSchema.shape.file>;

        const data = await recognizeTextFromFile(path);

        res.status(200).json({ message: data });
    } catch (error) {
        logger('Error in POST /documents:', error);
        res.status(500).json({
            code: 'features.documents.core.post.error',
            message: 'Error to upload documents',
            args: error,
            data: {},
        } as APIResponse);
    }
});

export { route };
