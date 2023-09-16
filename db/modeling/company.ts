import mongoose, { Document, Schema, Types, model } from 'mongoose';
import AccountHandler, { AccountModel, IAccount } from './account';
import { IProject } from './project';
import { UpdateCompanyReq } from '../../app/(types)/api/requests/company';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface ICompany extends Document {
    name: string;
    admin: IAccount;
    users: IAccount[];
    projects: IProject[];
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
        admin: { type: mongoose.SchemaTypes.ObjectId, required: true },
        users: [{ type: [mongoose.SchemaTypes.ObjectId], required: true }],
        projects: [{ type: [mongoose.SchemaTypes.ObjectId], required: false }],
    },
    {
        // add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

export const CompanyModel =
    mongoose.models.Company || model<ICompany>('Company', companySchema);

export async function findById(id: string): Promise<
    | (Document<unknown, {}, ICompany> &
          ICompany & {
              _id: Types.ObjectId;
          })
    | null
> {
    return await CompanyModel.findById(id);
}

export async function findByName(name: string): Promise<
    | (Document<unknown, {}, ICompany> &
          ICompany & {
              _id: Types.ObjectId;
          })
    | null
> {
    return await CompanyModel.findOne({ name });
}

// todo lots of cascading to the users and projects that have this as a foreign key would need to be done here.
// learn how to do later
export async function update(
    updateObj: UpdateCompanyReq
): Promise<ICompany | null> {
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

export async function deleteCompany(id: string): Promise<ICompany | null> {
    return await CompanyModel.findByIdAndDelete(id);
}

export async function checkExistsByName(name: string): Promise<boolean> {
    const company = await CompanyModel.exists({ name });
    return !!company;
}

export async function create(name: string): Promise<any> {
    const exists: boolean = await checkExistsByName(name);

    if (!exists) {
        let company;
        // const session: mongoose.mongo.ClientSession = await mongoose.startSession();
        // session.startTransaction();

        try {
            // Perform operations within the transaction
            const account: IAccount = await AccountHandler.create(
                `admin-${name}`,
                'password',
                Role.ADMIN
                // session
            );
            company = await CompanyModel.create([
                { name, admin: account._id, users: [account._id] },
            ]);
            console.log('COMPANY???? ', company);

            // Commit the transaction if all operations succeed
            // await session.commitTransaction();
        } catch (error) {
            // Rollback the transaction if any operation fails
            // await session.abortTransaction();
            throw error;
        } finally {
            // End the session
            // session.endSession();
        }
        return company;
    } else {
        return null;
    }
}
