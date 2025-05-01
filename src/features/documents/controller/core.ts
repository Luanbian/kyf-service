import debug from 'debug';
import { z } from 'zod';
import { Router } from 'express';
import {
    type APIResponse,
    recognizeTextFromImage,
    pdfToText,
} from '../../../services';
import { uploadMiddleware } from '../middleware/upload';
import { fileSchema } from './schemas';
import * as modelCustomer from '../../customer/model';
import { extractValidCPFs } from '../../../utils/recognizeCPF';

const logger = debug('features:documents:controller:core');
const route = Router();

route.post('/:id', uploadMiddleware, async (req, res) => {
    try {
        const { id } = req.params as { id: string };
        const { path, mimetype } = req.file as z.infer<
            typeof fileSchema.shape.file
        >;

        let data: string;
        if (mimetype === 'application/pdf') {
            data = await pdfToText(path);
        } else {
            data = await recognizeTextFromImage(path);
        }

        const cpfFound = extractValidCPFs(data);
        await modelCustomer.updateDocuments({ id, doc: { cpf: cpfFound[0] } });

        res.status(200).json({
            code: 'features.documents.core.post.success',
            message: 'Document uploaded successfully',
            args: {},
            data: {},
        } as APIResponse);
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
