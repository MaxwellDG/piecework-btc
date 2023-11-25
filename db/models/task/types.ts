import { Document, ObjectId, PopulatedDoc, Types } from 'mongoose';
import { IProject } from '../project/types';
import { IMessage } from '../message/types';

export enum TASK_STATUS {
    UNASSIGNED = 'UNASSIGNED',
    ASSIGNED = 'ASSIGNED',
    PENDING_REVIEW = 'PENDING_REVIEW',
    PENDING_PAYMENT = 'PENDING_PAYMENT',
    ARCHIVED = 'ARCHIVED',
}

export interface ITask {
    _id: string;
    name: string;
    project: PopulatedDoc<Document<ObjectId> & IProject>;
    company: Types.ObjectId;
    desc: string;
    price: number;
    imageUrls: string[]; // doesn't actually do anything atm cause the file paths are derived from the project
    status: TASK_STATUS;
    createdAt: Date;
    updatedAt: Date;
    viewedBySuperAdmin: boolean;
    messages: IMessage;
}

export type UpdateTaskReq = {
    desc?: string;
    name?: string;
    price?: number;
    status?: TASK_STATUS;
    imageUrls?: string[];
    viewedBySuperAdmin?: boolean;
};
