import mongoose, { HydratedDocument, Schema, model } from 'mongoose';
import { IMail, PopulatedIMail } from './types';
import { EMAIL_SUBJECT_TYPE } from '../../../app/(services)/mailer/types';

export default {
    create,
    findAll,
    deleteAll,
};

const mailSchema = new Schema<IMail>(
    {
        subject: { type: String, required: true, unique: false },
        company: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: false,
            ref: 'company',
        },
        extraText: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

export const MailModel =
    mongoose.models.mail || model<IMail>('mail', mailSchema);

export async function deleteAll(): Promise<boolean> {
    const res = await MailModel.deleteMany({});
    return !!res;
}

// for the time being, this isn't expected to return anything with an outrageous length
export async function findAll(): Promise<PopulatedIMail[]> {
    const mails: PopulatedIMail[] = (await MailModel.find({})
        .populate('company')
        .exec()) as PopulatedIMail[];
    return mails;
}

export async function create(
    subject: EMAIL_SUBJECT_TYPE,
    company: string,
    extraText?: string
): Promise<HydratedDocument<IMail>> {
    return await MailModel.create({ subject, company, extraText });
}
