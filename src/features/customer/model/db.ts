import { getDb, ObjectId } from '../../../services';
import { COLLECTION_CUSTOMERS, CustomersDocument } from './schema';
import {
    CreateCustomerParams,
    UpdateCustomerDiscordParams,
    UpdateDocumentsParams,
} from './types';

const customers = () =>
    getDb().collection<CustomersDocument>(COLLECTION_CUSTOMERS);

export const createCustomer = async ({ customer }: CreateCustomerParams) =>
    customers().insertOne(customer);

export const updateDiscord = async ({
    id,
    discord,
}: UpdateCustomerDiscordParams) =>
    customers().updateOne({ _id: new ObjectId(id) }, { $set: { discord } });

export const findCustomerById = async (id: string) =>
    customers().findOne({ _id: new ObjectId(id) });

export const updateDocuments = async ({ id, doc }: UpdateDocumentsParams) =>
    customers().updateOne(
        { _id: new ObjectId(id) },
        { $set: { documents: doc } }
    );

export const findCustomerByEmail = async (email: string) =>
    customers().findOne({ email });
