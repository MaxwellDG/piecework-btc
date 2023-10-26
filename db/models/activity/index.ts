import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';
import { ActivityCRUD, ActivityType, IActivity } from './types';

export default {
    getActivity,
    create,
    deleteActivity,
};

// todo a migration to add would be a url path to link to when clicked
export const activitySchema = new Schema<IActivity>(
    {
        text: { type: String, required: true },
        company: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            unique: false,
        },
        crud: { type: String, required: true },
        type: { type: String, required: true },
        refId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: false,
            unique: false,
        },
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
    companyId: string,
    refId?: string
): Promise<HydratedDocument<IActivity>> {
    const activity: Promise<HydratedDocument<IActivity>> =
        await ActivityModel.create({
            text,
            crud,
            type,
            company: companyId,
            refId,
        });
    return activity;
}
