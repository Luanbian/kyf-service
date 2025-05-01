import { getDb, ObjectId } from '../../../services';
import { COLLECTION_CUSTOMERS, CustomersDocument } from './schema';
import { CreateCustomerParams, UpdateCustomerDiscordParams } from './types';

const customers = () =>
    getDb().collection<CustomersDocument>(COLLECTION_CUSTOMERS);

export const createCustomer = async ({ customer }: CreateCustomerParams) =>
    customers().insertOne(customer);

export const updateDiscord = async ({
    id,
    discord,
}: UpdateCustomerDiscordParams) =>
    customers().updateOne({ _id: new ObjectId(id) }, { $set: { discord } });
