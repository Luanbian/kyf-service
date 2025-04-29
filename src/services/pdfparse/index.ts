import debug from 'debug';
import pdfParse from 'pdf-parse';
import fs from 'fs';

const logger = debug('services:pdfparse');

export const pdfToText = async (filePath: string) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
    } catch (error) {
        logger('Error in pdfToText:', error);
        throw error;
    } finally {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};
