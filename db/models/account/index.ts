import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';
import { IAccount, Role, UpdateAccountReq } from './types';

export default {
    findById,
    findByUsername,
    findByLogin,
    findAllByCompany,
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

// set combination of username and company to unique
accountSchema.index({ username: 1, company: 1 }, { unique: true });

export const AccountModel =
    mongoose.models.account || model<IAccount>('account', accountSchema);

export async function findById(
    id: string
): Promise<HydratedDocument<IAccount> | null> {
    return await AccountModel.findById(id);
}

export async function findAllByCompany(
    companyId: string
): Promise<HydratedDocument<IAccount>[]> {
    // sort for Role.ADMIN first
    return await AccountModel.find({ company: companyId }).sort({
        role: 'desc',
    });
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
    _id: string,
    obj: UpdateAccountReq
): Promise<HydratedDocument<IAccount> | null> {
    const { username, password, role } = obj;

    const accountDoc: HydratedDocument<IAccount> | null = await findById(_id);
    if (accountDoc) {
        accountDoc.username = username ?? accountDoc.username;
        accountDoc.password = password ?? accountDoc.password;
        accountDoc.role = role ?? accountDoc.role;
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
    company: string
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
