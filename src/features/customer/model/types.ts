import { ObjectId } from '../../../services';
import { CustomerDocuments } from '../../documents/model/schema';
import { CustomersDocument, CustomerDiscord } from './schema';

export interface CreateCustomerParams {
    customer: CustomersDocument;
}

export interface UpdateCustomerDiscordParams {
    id: string | ObjectId;
    discord: CustomerDiscord;
}

export interface UpdateDocumentsParams {
    id: string | ObjectId;
    doc: CustomerDocuments;
}
