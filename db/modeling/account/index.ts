import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';
import { IMessage } from '../message';
import { UpdateAccountReq } from '../../../app/(types)/api/requests/accounts';

export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IAccount {
    _id: string;
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
        username: { type: String, required: true, unique: false },
        password: { type: String, required: true, unqiue: false },
        messages: { type: [String], required: false, unqie: false },
        role: {
            type: String,
            enum: Role,
            required: true,
            default: Role.USER,
            unique: false,
        },
        company: { type: Schema.Types.ObjectId, required: true },
    },
    {
        // add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

accountSchema.index({ username: 1, company: 1 }, { unique: true });

export const AccountModel =
    mongoose.models.account || model<IAccount>('account', accountSchema);

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
    obj: UpdateAccountReq
): Promise<HydratedDocument<IAccount> | null> {
    const { _id, username, password } = obj;

    const accountDoc = await findById(_id);
    if (accountDoc) {
        accountDoc.username = username ?? accountDoc.username;
        accountDoc.password = password ?? accountDoc.password;
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
