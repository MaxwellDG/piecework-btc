import mongoose, { Schema, Types, model } from 'mongoose';
import { ICompany } from './company';

export interface IMessage extends Document {
    isUser: boolean; // isfrom User or Piecework-BTC
    text: string;
    isRead: boolean;
    company?: ICompany; // todo switch back to mandatory
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
    mongoose.models.Message || model<IMessage>('Message', messageSchema);

export async function getMessages(companyId: number) {
    const messages: IMessage[] = await MessageModel.find({
        company: companyId,
    });
    return messages;
}

export async function deleteMessage(id: string): Promise<IMessage | null> {
    return await MessageModel.findByIdAndDelete(id);
}

export async function create(isUser: boolean, text: string): Promise<IMessage> {
    const message: IMessage = await MessageModel.create({ isUser, text });
    return message;
}
