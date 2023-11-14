export interface ICompany {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    viewedBySuperAdmin: boolean;
}

export type CompanyNameReq = {
    name: string;
};

export type UpdateCompanyReq = {
    name?: string;
    viewedBySuperAdmin?: boolean;
};
