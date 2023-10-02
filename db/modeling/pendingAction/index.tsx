import mongoose, { Schema, Types, model } from 'mongoose';
import { ICompany } from '../company';

export enum PendingActionType {
    PAYMENT = 'payment',
}

export interface IPendingAction {
    company: ICompany;
    isFailed: boolean;
    type: PendingActionType;
    targetId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

export default {
    getPendingActions,
    create,
    updatePendingActionToFailed,
    deletePendingAction,
};

export const pendingActionSchema = new Schema<IPendingAction>(
    {
        text: { type: String, required: true },
        company: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            unique: true,
        },
        isFailed: { type: Boolean, required: true, default: false },
        type: { type: String, required: true },
        targetId: { type: String, required: true },
    },
    {
        // add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

export const PendingActionModel =
    mongoose.models.PendingAction ||
    model<IPendingAction>('PendingAction', pendingActionSchema);

export async function getPendingActions(companyId: string) {
    const pendingActions: IPendingAction[] = await PendingActionModel.find({
        company: companyId,
    });
    return pendingActions;
}

export async function updatePendingActionToFailed(id: string) {
    const pendingAction = await PendingActionModel.findOneAndUpdate(
        { id },
        { isFailed: true }
    );
    return pendingAction;
}

export async function deletePendingAction(
    id: string
): Promise<IPendingAction | null> {
    // todo create an activity
    return await PendingActionModel.findByIdAndDelete(id);
}

export async function create(
    text: string,
    type: PendingActionType,
    targetId: string,
    companyId: string
): Promise<IPendingAction> {
    // todo create an activity
    const pendingAction: IPendingAction = await PendingActionModel.create({
        text,
        type,
        targetId,
        company: companyId,
    });
    return pendingAction;
}
