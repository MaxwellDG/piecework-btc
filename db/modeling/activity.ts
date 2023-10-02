import mongoose, { Schema, Types, model } from 'mongoose';
import { ICompany } from './company';

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

export interface IActivity extends Document {
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
    mongoose.models.Activity || model<IActivity>('Activity', activitySchema);

export async function getActivity(companyId: string) {
    const messages: IActivity[] = await ActivityModel.find({
        company: companyId,
    });
    return messages;
}

export async function deleteActivity(id: string): Promise<IActivity | null> {
    return await ActivityModel.findByIdAndDelete(id);
}

export async function create(
    text: string,
    crud: ActivityCRUD,
    type: ActivityType,
    companyId: string
): Promise<IActivity> {
    const activity: IActivity = await ActivityModel.create({
        text,
        crud,
        type,
        company: companyId,
    });
    return activity;
}
