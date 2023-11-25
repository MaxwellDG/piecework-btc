import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';
import { ICompany } from '../company/types';
import { ITask } from '../task/types';
import { IMessage } from './types';

export default {
    getMessages,
    create,
    deleteMessage,
};

export const messageSchema = new Schema<IMessage>(
    {
        isUser: { type: Boolean, required: true },
        text: { type: String, required: true },
        isRead: { type: Boolean, required: true, default: false },
        company: { type: mongoose.SchemaTypes.ObjectId, required: true },
        task: { type: mongoose.SchemaTypes.ObjectId, required: false },
    },
    {
        // add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

export const MessageModel =
    mongoose.models.message || model<IMessage>('message', messageSchema);

export async function getMessages(
    companyId: string,
    taskId?: string
): Promise<HydratedDocument<IMessage>[]> {
    const payload = taskId
        ? { company: companyId, task: taskId }
        : { company: companyId };
    const messages: HydratedDocument<IMessage>[] =
        await MessageModel.find(payload);
    return messages;
}

export async function deleteMessage(id: string): Promise<boolean> {
    const res = await MessageModel.findByIdAndDelete(id);
    return !!res;
}

export async function create(
    isUser: boolean,
    text: string,
    companyId: string,
    taskId?: string
): Promise<HydratedDocument<IMessage>> {
    const payload = {
        company: companyId,
        isUser,
        text,
    };
    const finalPayload = taskId ? { ...payload, task: taskId } : payload;
    const message: HydratedDocument<IMessage> =
        await MessageModel.create(finalPayload);
    return message;
}
