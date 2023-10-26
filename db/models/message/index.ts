import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';
import { ICompany } from '../company/types';

export interface IMessage {
    _id: string;
    isUser: boolean; // is from User or Piecework-BTC
    text: string;
    isRead: boolean;
    company: ICompany;
    createdAt?: Date;
}

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
    },
    {
        // add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

export const MessageModel =
    mongoose.models.message || model<IMessage>('message', messageSchema);

export async function getMessages(
    companyId: string
): Promise<HydratedDocument<IMessage>[]> {
    const messages: HydratedDocument<IMessage>[] = await MessageModel.find({
        company: companyId,
    });
    return messages;
}

export async function deleteMessage(id: string): Promise<boolean> {
    const res = await MessageModel.findByIdAndDelete(id);
    return !!res;
}

export async function create(
    isUser: boolean,
    text: string,
    companyId: string
): Promise<HydratedDocument<IMessage>> {
    const message: HydratedDocument<IMessage> = await MessageModel.create({
        company: companyId,
        isUser,
        text,
    });
    return message;
}
