import { Document, Schema, Types, model } from "mongoose";

export interface IAccount {
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default {
  findById,
  findByAddress,
  create,
  deleteAccount,
  update,
};

export const accountSchema = new Schema<IAccount>(
  {
    address: { type: String, unique: true, required: true },
    // messages: { type: Array, required: false },
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

export const AccountModel = model<IAccount>("Account", accountSchema);

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
  }

  return accountDoc;
}

export async function create(address: string): Promise<IAccount | null> {
  const whatisthis = await AccountModel.create({ address });

  console.log("What is this? ", whatisthis);
  // maybe I need to do whatisthis.exec() as Phind suggests?

  return whatisthis;
}
