import mongoose, { HydratedDocument, Schema, Types, model } from 'mongoose';
import { UpdateTaskReq } from '../../../app/(types)/api/requests/tasks';
import { ITask, TASK_STATUS } from './types';

export default {
    create,
    update,
    deleteTask,
    findById,
    findByProjectId,
    countTasks,
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
    projectId: string,
    companyId: string
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
): Promise<HydratedDocument<ITask>[]> {
    console.log('company id: ', companyId, 'project', projectId);
    return await TaskModel.find({ company: companyId, project: projectId });
}

export async function findById(
    id: string,
    company: string
): Promise<HydratedDocument<ITask> | null> {
    return await TaskModel.findOne({ id, company });
}

export async function countTasks(
    companyId: string,
    status?: TASK_STATUS
): Promise<number> {
    return status
        ? await TaskModel.countDocuments({ company: companyId, status })
        : await TaskModel.countDocuments({ company: companyId });
}

// todo investigate if this needs security to prevent users from updating other users' tasks
export async function update(
    _id: string,
    companyId: string,
    obj: UpdateTaskReq
): Promise<HydratedDocument<ITask> | null> {
    const { desc, status, price, name }: UpdateTaskReq = obj;
    const task: HydratedDocument<ITask> | null = await findById(_id);

    if (task) {
        task.desc = desc ?? task.desc;
        task.status = status ?? task.status;
        task.price === price ?? task.price;
        task.name === name ?? task.name;
        await task.save();
        return task;
    } else {
        return null;
    }
}

export async function deleteTask(
    id: string,
    companyId: string
): Promise<boolean> {
    try {
        await TaskModel.deleteOne({ _id: id, company: companyId });
        return true;
    } catch (e) {
        return false;
    }
}
