import mongoose, { HydratedDocument, Schema, model } from 'mongoose';
import { UpdateCompanyReq } from '../../../app/(types)/api/requests/company';

export interface ICompany {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export default {
    findById,
    findByName,
    create,
    deleteCompany,
    update,
};

// todo for now we're using address cause I was trying to be fancy, but that might not work
// when the website is meant to be accessed by an organization

// If you're gonna do it like its a company dashboard for web2, should start with creating an organization
// and THEN create the account(s). If no users present, first one gets 'Admin' role

export const companySchema = new Schema<ICompany>(
    {
        name: { type: String, unique: true, required: true },
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
            console.log('COMPANY???? ', company);
            return company;
        } catch (e) {
            console.log('Error creating company:', e);
            return null;
        }
    } else {
        return null;
    }
}
