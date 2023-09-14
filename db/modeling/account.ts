import mongoose, { Document, Schema, Types, model } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IAccount extends Document {
  _id: Types.ObjectId;
  username: string;
  role: Role;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  messages?: string[];
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
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  },
);

export const AccountModel =
  mongoose.models.Account || model<IAccount>("Account", accountSchema);

export async function findById(id: string): Promise<
  | (Document<unknown, {}, IAccount> &
      IAccount & {
        _id: Types.ObjectId;
      })
  | null
> {
  return await AccountModel.findById(id);
}

export async function findByUsername(
  company: string,
  username: string,
): Promise<IAccount | null> {
  return await AccountModel.findOne({ company, username });
}

export async function findByLogin(
  company: string,
  username: string,
  password: string,
): Promise<IAccount | null> {
  return await AccountModel.findOne({ company, username, password });
}

export async function deleteAccount(id: string): Promise<IAccount | null> {
  return await AccountModel.findByIdAndDelete(id);
}

export async function update(
  id: string,
  username: string,
): Promise<IAccount | null> {
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
  session?: mongoose.mongo.ClientSession,
): Promise<any> {
  let account = null;
  const param = !!session
    ? [{ username, role, password }]
    : { username, role, password };

  try {
    account = await AccountModel.create(
      param,
      session ? { session } : undefined,
    );
  } catch (error) {
    throw error;
  }

  console.log("CREATED ACCOUNT: ", account);

  return account;
}
