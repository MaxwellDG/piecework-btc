import { Role } from '../../../../../db/models/account/types';

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
