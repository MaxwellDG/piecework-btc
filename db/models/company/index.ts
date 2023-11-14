import mongoose, { HydratedDocument, Query, Schema, model } from 'mongoose';
import { ICompany, UpdateCompanyReq } from './types';
import { ActivityModel } from '../activity';
import { ProjectModel } from '../project';
import { PendingActionModel } from '../pendingAction';
import { MessageModel } from '../message';
import { AccountModel } from '../account';

export default {
    findById,
    findByName,
    findAllPaginated,
    create,
    deleteCompany,
    update,
};

export const companySchema = new Schema<ICompany>(
    {
        name: { type: String, unique: true, required: true },
        viewedBySuperAdmin: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

// on company delete cascade delete projects (and tasks), pendingActions, messages, and activities
companySchema.pre('deleteOne', async function (next) {
    const query = this as Query<ICompany, ICompany>;
    const companyId: string = query.getFilter()['_id'];
    await ProjectModel.deleteMany({ project: companyId }); // cascades to delete tasks
    await ActivityModel.deleteMany({ project: companyId });
    await PendingActionModel.deleteMany({ company: companyId });
    await MessageModel.deleteMany({ company: companyId });
    await AccountModel.deleteMany({ company: companyId });
    next();
});

export const CompanyModel =
    mongoose.models.company || model<ICompany>('company', companySchema);

export async function findById(
    id: string
): Promise<HydratedDocument<ICompany> | null> {
    return await CompanyModel.findById(id);
}

export async function findByName(
    name: string
): Promise<HydratedDocument<ICompany> | null> {
    return await CompanyModel.findOne({ name });
}

export async function findAllPaginated(
    limit: number,
    offsetUpdatedAt: Date
): Promise<{ companies: HydratedDocument<ICompany>[]; newOffset: Date }> {
    // First search for companies with viewedBySuperAdmin = false
    const unviewedCompanies: HydratedDocument<ICompany>[] =
        await CompanyModel.find({
            viewedBySuperAdmin: false,
            updatedAt: { $lte: offsetUpdatedAt },
        })
            .limit(limit)
            .sort({ updatedAt: 'desc' });

    // If there are no more viewedBySuperAdmin = false and the length of results is not 10
    // search for companies with viewedBySuperAdmin = true
    let viewedCompanies: HydratedDocument<ICompany>[] = [];
    const unviewedCompaniesLength = unviewedCompanies.length;
    if (unviewedCompaniesLength < 10) {
        viewedCompanies = await CompanyModel.find({
            viewedBySuperAdmin: true,
            updatedAt: { $lte: offsetUpdatedAt },
        })
            .limit(10 - unviewedCompaniesLength)
            .sort({ updatedAt: 'desc' });
    }
    const concattedCompanies = [...unviewedCompanies, ...viewedCompanies];
    const newOffset = concattedCompanies.length
        ? concattedCompanies[concattedCompanies.length - 1].updatedAt
        : new Date(0);
    return {
        companies: concattedCompanies,
        newOffset,
    };
}

export async function update(
    _id: string,
    updateObj: UpdateCompanyReq
): Promise<HydratedDocument<ICompany> | null> {
    const { name, viewedBySuperAdmin }: UpdateCompanyReq = updateObj;
    const company = await findById(_id);

    if (company) {
        company.name = name ?? company.name;
        company.viewedBySuperAdmin =
            viewedBySuperAdmin ?? company.viewedBySuperAdmin;
        await company.save();
        return company;
    } else {
        return null;
    }
}

export async function deleteCompany(
    id: string
): Promise<HydratedDocument<ICompany> | null> {
    return await CompanyModel.findByIdAndDelete(id);
}

export async function checkExistsByName(name: string): Promise<boolean> {
    const company = await CompanyModel.exists({ name });
    return !!company;
}

export async function create(
    name: string
): Promise<HydratedDocument<ICompany> | null> {
    const exists: boolean = await checkExistsByName(name);

    if (!exists) {
        let company;

        try {
            company = await CompanyModel.create({ name });
            return company;
        } catch (e) {
            return null;
        }
    } else {
        return null;
    }
}
