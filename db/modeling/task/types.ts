import { Document, ObjectId, PopulatedDoc, Types } from 'mongoose';
import { IProject } from '../project';

export enum TASK_STATUS {
    UNASSIGNED = 'UNASSIGNED',
    ASSIGNED = 'ASSIGNED',
    PENDING_REVIEW = 'PENDING_REVIEW',
    PENDING_PAYMENT = 'PENDING_PAYMENT',
    COMPLETED = 'COMPLETED',
}

export interface ITask {
    _id: string;
    name: string;
    project: PopulatedDoc<Document<ObjectId> & IProject>;
    company: Types.ObjectId;
    desc: string;
    price: number;
    imageUrls: string[];
    status: TASK_STATUS;
    createdAt: Date;
    updatedAt: Date;
}
