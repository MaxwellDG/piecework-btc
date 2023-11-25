import { ICompany } from '../company/types';
import { IMessage } from '../message/types';
import { Types } from 'mongoose';

export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IAccount {
    _id: string;
    username: string;
    role: Role;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    company: Types.ObjectId | ICompany;
    messages?: Types.ObjectId[] | IMessage[];
}

export type CreateAccountReq = {
    username: string;
    password: string;
    role: Role; // ADMIN || USER
};

export type UpdateAccountReq = {
    username?: string;
    password?: string;
    role?: Role;
};
