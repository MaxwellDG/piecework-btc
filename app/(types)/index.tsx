import { Role } from '../../db/models/account/types';

export type JWT_DATA = {
    _id: string;
    username: string;
    companyId: string;
    role: Role;
    exp?: number;
    iat?: number;
    nbf?: number;
};

export type Toast = {
    id: number;
    text: string;
    type: TOAST_TYPE;
};

export enum TOAST_TYPE {
    SUCCESS = 'uccesss',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
}
