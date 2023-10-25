import { Role } from '../../../../../db/modeling/account/types';

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
