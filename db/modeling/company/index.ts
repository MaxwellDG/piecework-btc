import mongoose, { HydratedDocument, Schema, model } from 'mongoose';
import { UpdateCompanyReq } from '../../../app/(types)/api/requests/company';

export default {
    findById,
    findByName,
    findAllPaginated,
    create,
    deleteCompany,
    update,
};

// todo for now we're using address cause I was trying to be fancy, but that might not work
// when the website is meant to be accessed by an organization

// If you're gonna do it like its a company dashboard for web2, should start with creating an organization
// and THEN create the account(s). If no users present, first one gets 'Admin' role

// todo migrate data without updateViewedByAdmin to docs thats do have it. default false

export const companySchema = new Schema<ICompany>(
    {
        name: { type: String, unique: true, required: true },
        updateViewedByAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

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

// todo lots of cascading to the users and projects that have this as a foreign key would need to be done here.
// learn how to do later
export async function update(
    updateObj: UpdateCompanyReq
): Promise<HydratedDocument<ICompany> | null> {
    const { name, newName }: UpdateCompanyReq = updateObj;
    const company = await findByName(name);

    if (company) {
        company.name = newName ?? company.name;
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
