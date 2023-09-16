import { Role } from '../../../../../db/modeling/account';

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
