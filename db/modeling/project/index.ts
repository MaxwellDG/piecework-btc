import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';

export interface IProject {
    name: string;
    company: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default {
    create,
    deleteProject,
    findProjectsByCompanyId,
};

export const projectSchema = new Schema<IProject>(
    {
        name: { type: String, required: true },
        company: { type: mongoose.SchemaTypes.ObjectId, required: true },
    },
    {
        timestamps: true,
    }
);

export const ProjectModel =
    mongoose.models.Project || model<IProject>('project', projectSchema);

export async function findProjectsByCompanyId(
    companyId: string
): Promise<HydratedDocument<IProject>[]> {
    return await ProjectModel.find({ company: companyId });
}

export async function create(
    name: string,
    companyId: string
): Promise<HydratedDocument<IProject>> {
    return await ProjectModel.create({ name, companyId });
}

export async function deleteProject(id: string): Promise<boolean> {
    const res = await ProjectModel.deleteOne({ id });
    return !!res;
}
