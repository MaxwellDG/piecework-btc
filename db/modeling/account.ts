import mongoose, { Document, Schema, Types, model } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IAccount extends Document {
  _id: Types.ObjectId;
  address: string;
  role: Role;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  messages?: string[];
}

export default {
  findById,
  findByAddress,
  findByLogin,
  create,
  deleteAccount,
  update,
};

// todo for now we're using address cause I was trying to be fancy, but that might not work
// when the website is meant to be accessed by an organization

// If you're gonna do it like its a company dashboard for web2, should start with creating an organization
// and THEN create the account(s). If no users present, first one gets 'Admin' role

export const accountSchema = new Schema<IAccount>(
  {
    address: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    messages: { type: [String], required: false },
    role: { type: String, enum: Role, required: true, default: Role.USER },
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  }
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

export async function findByAddress(address: string): Promise<IAccount | null> {
  return await AccountModel.findOne({ address });
}

export async function findByLogin(
  address: string,
  password: string
): Promise<IAccount | null> {
  return await AccountModel.findOne({ address, password });
}

export async function deleteAccount(id: string): Promise<IAccount | null> {
  return await AccountModel.findByIdAndDelete(id);
}

export async function update(
  id: string,
  address: string
): Promise<IAccount | null> {
  const accountDoc = await findById(id);

  if (accountDoc) {
    accountDoc.address = address;
    await accountDoc.save();
    return accountDoc;
  } else {
    return null;
  }
}

export async function create(
  address: string,
  password: string,
  role: Role,
  session?: mongoose.mongo.ClientSession
): Promise<any> {
  let account = null;
  const param = !!session
    ? [{ address, role, password }]
    : { address, role, password };

  try {
    account = await AccountModel.create(
      param,
      session ? { session } : undefined
    );
  } catch (error) {
    throw error;
  }

  console.log("CREATED ACCOUNT: ", account);

  return account;
}
