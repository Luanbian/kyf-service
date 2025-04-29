import debug from 'debug';
import { Router } from 'express';
import { APIResponse } from '../../../services';
import { uploadMiddleware } from '../middleware/upload';

const logger = debug('features:documents:controller:core');
const route = Router();

route.post('/', uploadMiddleware, async (req, res) => {
    try {
        res.status(200).json({ message: req.file });
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
