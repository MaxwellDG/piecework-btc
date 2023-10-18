import { Types } from 'mongoose';

export enum ActivityCRUD {
    CREATED = 'Created',
    UPDATED = 'Updated',
    READ = 'Read',
    DELETED = 'Deleted',
}

export enum ActivityType {
    MESSAGES = 'MESSAGES',
    PROJECTS = 'PROJECTS',
    USERS = 'USERS',
    TASKS = 'TASKS',
}

export interface IActivity {
    _id: string;
    company: Types.ObjectId;
    crud: ActivityCRUD;
    type: ActivityType;
    text: string;
    createdAt: Date;
    refId?: Types.ObjectId;
}
