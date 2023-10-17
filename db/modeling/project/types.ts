import { Types } from 'mongoose';

export interface IProject {
    _id: string;
    name: string;
    company: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
