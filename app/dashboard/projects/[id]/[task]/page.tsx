import { headers } from 'next/headers';
import { ITask } from '../../../../../db/modeling/task/types';
import TasksHandler from '../../../../../db/modeling/task';
import ProjectsHandler from '../../../../../db/modeling/project';

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

    return (
        <div className="flex flex-col">
            <p>{task.desc}</p>
            <div></div>
        </div>
    );
}
