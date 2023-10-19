import mongoose, { HydratedDocument, Schema, model } from 'mongoose';
import { UpdateCompanyReq } from '../../../app/(types)/api/requests/company';
import { ICompany } from './types';
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
        updateViewedByAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// on company delete cascade delete projects (and tasks), pendingActions, messages, and activities
companySchema.pre<ICompany>('deleteOne', async function (next) {
    await ProjectModel.deleteMany({ project: this._id }); // will cascade to delete tasks
    await ActivityModel.deleteMany({ project: this._id });
    await PendingActionModel.deleteMany({ company: this._id });
    await MessageModel.deleteMany({ company: this._id });
    await AccountModel.deleteMany({ company: this._id });
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
    const unviewedCompanies: HydratedDocument<ICompany>[] =
        await CompanyModel.find({
            updateViewedByAdmin: false,
            updatedAt: { $lte: offsetUpdatedAt },
        })
            .limit(limit)
            .sort({ updatedAt: 'desc' });
    let viewedCompanies: HydratedDocument<ICompany>[] = [];
    const unviewedCompaniesLength = unviewedCompanies.length;
    if (unviewedCompaniesLength < 10) {
        viewedCompanies = await CompanyModel.find({
            updateViewedByAdmin: true,
            updatedAt: { $lte: offsetUpdatedAt },
        })
            .limit(10 - unviewedCompaniesLength)
            .sort({ updatedAt: 'desc' });
    }
    const concattedCompanies = [...unviewedCompanies, ...viewedCompanies];
    const newOffset = concattedCompanies.length
        ? concattedCompanies[concattedCompanies.length - 1].updatedAt
        : new Date(Date.now());
    return {
        companies: concattedCompanies,
        newOffset,
    };
}

export async function update(
    _id: string,
    updateObj: UpdateCompanyReq
): Promise<HydratedDocument<ICompany> | null> {
    const { name, updateViewedByAdmin }: UpdateCompanyReq = updateObj;
    const company = await findById(_id);

    if (company) {
        company.name = name ?? company.name;
        company.updateViewedByAdmin =
            updateViewedByAdmin ?? company.updateViewedByAdmin;
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
