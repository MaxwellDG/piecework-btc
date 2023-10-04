import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';
import { UpdateTaskReq } from '../../../app/(types)/api/requests/tasks';

export enum TASK_STATUS {
    UNASSIGNED = 'UNASSIGNED',
    ASSIGNED = 'ASSIGNED',
    PENDING_REVIEW = 'PENDING_REVIEW',
    PENDING_PAYMENT = 'PENDING_PAYMENT',
    COMPLETED = 'COMPLETED',
}

export interface ITask {
    _id: string;
    name: string;
    project: Types.ObjectId;
    company: Types.ObjectId;
    desc: string;
    price: number;
    status: TASK_STATUS;
    createdAt: Date;
    updatedAt: Date;
}

export default {
    create,
    update,
    findByProjectId,
};

export const taskSchema = new Schema<ITask>(
    {
        name: { type: String, required: true },
        project: { type: Schema.Types.ObjectId, required: true },
        company: { type: Schema.Types.ObjectId, required: true },
        desc: { type: String, required: true },
        price: { type: Number, required: true },
        status: { type: String, enum: TASK_STATUS, required: true },
    },
    {
        timestamps: true,
    }
);

export const TaskModel =
    mongoose.models.task || model<ITask>('task', taskSchema);

export async function create(
    name: string,
    desc: string,
    price: number,
    companyId: string,
    projectId: string
): Promise<HydratedDocument<ITask>> {
    return await TaskModel.create({
        name,
        desc,
        price,
        project: projectId,
        company: companyId,
        status: TASK_STATUS.UNASSIGNED,
    });
}

export async function findByProjectId(
    companyId: string,
    projectId: string
): Promise<HydratedDocument<ITask>[] | null> {
    return await TaskModel.find({ company: companyId, project: projectId });
}

export async function findById(
    id: string
): Promise<HydratedDocument<ITask> | null> {
    return await TaskModel.findOne({ id });
}

export async function update(
    obj: UpdateTaskReq
): Promise<HydratedDocument<ITask> | null> {
    const { id, desc, status }: UpdateTaskReq = obj;
    const task: HydratedDocument<ITask> | null = await findById(id);

    if (task) {
        task.desc = desc ?? task.desc;
        task.status = status ?? task.status;
        await task.save();
        return task;
    } else {
        return null;
    }
}
