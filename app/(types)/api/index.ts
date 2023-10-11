import { Role } from '../../../db/modeling/account';

export type JWT_DATA = {
    _id: string;
    username: string;
    companyId: string;
    role: Role;
    exp?: number;
    iat?: number;
    nbf?: number;
};
