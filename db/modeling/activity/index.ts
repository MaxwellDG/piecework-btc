import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';
import { ICompany } from '../company';

export enum ActivityCRUD {
    CREATED = 'Created',
    UPDATED = 'Updated',
    READ = 'Read',
    DELETED = 'Deleted',
}

export enum ActivityType {
    MESSAGES = 'MESSAGES',
    PROJECTS = 'PROJECTS',
    USERS = 'USERS',
}

export interface IActivity {
    _id: string;
    company: ICompany;
    crud: ActivityCRUD;
    type: ActivityType;
    text: string;
    createdAt: Date;
}

export default {
    getActivity,
    create,
    deleteActivity,
};

export const activitySchema = new Schema<IActivity>(
    {
        text: { type: String, required: true },
        company: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            unique: true,
        },
        crud: { type: String, required: true },
        type: { type: String, required: true },
    },
    {
        // add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

export const ActivityModel =
    mongoose.models.activity || model<IActivity>('activity', activitySchema);

export async function getActivity(
    companyId: string
): Promise<HydratedDocument<IActivity>[]> {
    const messages: HydratedDocument<IActivity>[] | null =
        await ActivityModel.find({
            company: companyId,
        });
    return messages;
}

export async function deleteActivity(id: string): Promise<boolean> {
    const res = await ActivityModel.findByIdAndDelete(id);
    return !!res;
}

export async function create(
    text: string,
    crud: ActivityCRUD,
    type: ActivityType,
    companyId: string
): Promise<HydratedDocument<IActivity> | null> {
    const activity: Promise<HydratedDocument<IActivity> | null> =
        await ActivityModel.create({
            text,
            crud,
            type,
            company: companyId,
        });
    return activity;
}
