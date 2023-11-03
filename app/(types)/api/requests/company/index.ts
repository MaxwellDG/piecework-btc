export type CompanyNameReq = {
    name: string;
};

export type UpdateCompanyReq = {
    name?: string;
    viewedBySuperAdmin?: boolean;
};
