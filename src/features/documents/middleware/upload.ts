import debug from 'debug';
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import { APIResponse } from '../../../services';
import { storage } from '../../../utils/multerStorage';
import { fileSchema } from '../controller/schemas';
import { validMimeTypes } from '../../../utils/validMimetypes';

const logger = debug('features:documents:middleware:upload');

const upload = multer({ storage }).single('document');

export const uploadMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    upload(req, res, (err: any) => {
        if (err) {
            logger('Error in multer upload:', err);
            res.status(500).json({
                code: 'features.documents.middleware.upload.error',
                message: 'Error to upload documents',
                args: err,
                data: {},
            } as APIResponse);
            return;
        }

        if (req.file && !validMimeTypes.includes(req.file.mimetype)) {
            logger('Invalid file type:', req.file.mimetype);
            res.status(400).json({
                code: 'features.documents.middleware.upload.invalid.type',
                message: 'Invalid file type',
                args: { mimetype: req.file.mimetype },
                data: {},
            } as APIResponse);
            return;
        }

        const fileValidation = fileSchema.safeParse({ file: req.file });
        if (!fileValidation.success) {
            logger('File validation error:', fileValidation.error);
            res.status(400).json({
                code: 'features.documents.middleware.upload.validation.error',
                message: 'Invalid file',
                args: fileValidation.error.format(),
                data: {},
            } as APIResponse);
            return;
        }

        next();
    });
};
