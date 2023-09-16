import mongoose, { Schema, Types, model } from 'mongoose';
import { IAccount } from './account';

export interface IProject extends Document {
    name: string;
    accountOwner: IAccount;
    createdAt: Date;
    updatedAt: Date;
}

export const projectSchema = new Schema<IProject>(
    {
        name: { type: String, required: true },
        accountOwner: { type: mongoose.SchemaTypes.ObjectId, required: true },
    },
    {
        timestamps: true,
    }
);

export const ProjectModel =
    mongoose.models.Project || model<IProject>('project', projectSchema);

export async function create(
    name: string,
    accountOwnerId: number
): Promise<IAccount | null> {
    // todo get account entity here and link it? or just need the id and it does the job????

    return await ProjectModel.create({ name, accountOwnerId }); // todo correct values
}
