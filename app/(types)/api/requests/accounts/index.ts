// todo note to self. This could all be done better with generics

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
