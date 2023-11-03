import { Types } from 'mongoose';
import { EMAIL_SUBJECT_TYPE } from '../../../app/(services)/mailer/types';
import { ICompany } from '../company/types';
import { ITask } from '../task/types';

export type IMail = {
    subject: EMAIL_SUBJECT_TYPE;
    company: Types.ObjectId;
    extraText?: string;
};

export interface PopulatedIMail {
    subject: EMAIL_SUBJECT_TYPE;
    company: ICompany;
    extraText?: string;
}
