import { ObjectId } from '../../../services';
import { CustomersDocument, CustomerDiscord } from './schema';

export interface CreateCustomerParams {
    customer: CustomersDocument;
}

export interface UpdateCustomerDiscordParams {
    id: string | ObjectId;
    discord: CustomerDiscord;
}
