import mongoose, {
    HydratedDocument,
    Query,
    Schema,
    Types,
    model,
} from 'mongoose';
import { IProject } from './types';
import { TaskModel } from '../task';
import { ActivityModel } from '../activity';
import { PendingActionModel } from '../pendingAction';

export default {
    create,
    deleteProject,
    findByCompanyId,
    findById,
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

// on project delete cascade delete tasks, pendingActions and activities
projectSchema.pre('deleteOne', async function (next) {
    const query = this as Query<IProject, IProject>;
    const projectId: string = query.getFilter()['_id'];
    await TaskModel.deleteMany({ project: projectId });
    await ActivityModel.deleteMany({ project: projectId });
    await PendingActionModel.deleteMany({ company: projectId });
    next();
});

export const ProjectModel =
    mongoose.models.project || model<IProject>('project', projectSchema);

export async function findByCompanyId(
    companyId: string
): Promise<HydratedDocument<IProject>[]> {
    return await ProjectModel.find({ company: companyId });
}

export async function findById(
    id: string,
    companyId: string
): Promise<HydratedDocument<IProject> | null> {
    return await ProjectModel.findOne({ _id: id, company: companyId });
}

export async function create(
    name: string,
    companyId: string
): Promise<HydratedDocument<IProject>> {
    return await ProjectModel.create({ name, company: companyId });
}

export async function deleteProject(
    company: string,
    _id: string
): Promise<boolean> {
    const res = await ProjectModel.deleteOne({ company, _id });
    return !!res;
}
