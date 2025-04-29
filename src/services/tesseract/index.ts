import debug from 'debug';
import path from 'path';
import fs from 'fs';
import { recognize } from 'tesseract.js';

const logger = debug('services:tesseract');

export const recognizeTextFromFile = async (filePath: string) => {
    const file = path.resolve(process.cwd(), filePath);

    try {
        const { data } = await recognize(file, 'por');
        return data.text;
    } catch (error) {
        logger('Error in tesseract:', error);
        throw error;
    } finally {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    }
};
