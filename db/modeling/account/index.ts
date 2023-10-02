import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';
import { IMessage } from '../message';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IAccount {
    username: string;
    role: Role;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    company: Types.ObjectId;
    messages?: IMessage[];
}

export default {
    findById,
    findByUsername,
    findByLogin,
    create,
    deleteAccount,
    update,
};

export const accountSchema = new Schema<IAccount>(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        messages: { type: [String], required: false },
        role: { type: String, enum: Role, required: true, default: Role.USER },
        company: { type: Schema.Types.ObjectId, required: true },
    },
    {
        // add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

export const AccountModel =
    mongoose.models.Account || model<IAccount>('account', accountSchema);

export async function findById(
    id: string
): Promise<HydratedDocument<IAccount> | null> {
    return await AccountModel.findById(id);
}

export async function findByUsername(
    company: string,
    username: string
): Promise<HydratedDocument<IAccount> | null> {
    return await AccountModel.findOne({ company, username });
}

export async function findByLogin(
    company: string,
    username: string,
    password: string
): Promise<HydratedDocument<IAccount> | null> {
    return await AccountModel.findOne({ company, username, password });
}

export async function deleteAccount(
    id: string
): Promise<HydratedDocument<IAccount> | null> {
    return await AccountModel.findByIdAndDelete(id);
}

export async function update(
    id: string,
    username: string
): Promise<HydratedDocument<IAccount> | null> {
    const accountDoc = await findById(id);

    if (accountDoc) {
        accountDoc.username = username;
        await accountDoc.save();
        return accountDoc;
    } else {
        return null;
    }
}

export async function create(
    username: string,
    password: string,
    role: Role,
    company: Types.ObjectId
): Promise<HydratedDocument<IAccount> | null> {
    let account = null;
    const param = { username, role, password, company };

    try {
        account = await AccountModel.create(param);
    } catch (error) {
        throw error;
    }

    return account;
}
