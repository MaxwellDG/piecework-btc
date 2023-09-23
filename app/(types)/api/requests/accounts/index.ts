import { Role } from '../../../../../db/modeling/account';

// todo note to self. This could all be done better with generics

export type CreateAccountReq = {
    address: string;
    password: string;
    role: Role; // ADMIN || USER
};

export type UpdateAccountReq = {
    id: number;
    address?: string;
    password?: string;
    role?: Role;
};
