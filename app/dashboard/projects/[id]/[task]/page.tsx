import { headers } from 'next/headers';
import { ITask } from '../../../../../db/modeling/task/types';
import TasksHandler from '../../../../../db/modeling/task';
import TaskImages from '../../../../(components)/taskImages';
import { getBucketFileUrls } from '../../../../(clients)/google';

export default async function Page() {
    const _headers = headers();
    const company = _headers.get('jwt-company') as string;
    const path: string = _headers.get('x-invoke-path') as string;
    const pathSplit: string[] = path.split('/');
    const taskId: string = pathSplit[pathSplit.length - 1];
    const projectId: string = pathSplit[pathSplit.length - 2];
    const task = (await TasksHandler.findById(
        taskId,
        company,
        projectId
    )) as ITask;
    const bucketFileUrls = await getBucketFileUrls('tasks', projectId);

    return (
        <div className="flex flex-col">
            <p>{task.desc}</p>
            <TaskImages
                projectId={projectId}
                imageUrls={bucketFileUrls}
                taskId={task._id}
            />
        </div>
    );
}
