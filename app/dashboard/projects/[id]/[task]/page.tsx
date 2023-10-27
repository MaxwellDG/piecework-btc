import { headers } from 'next/headers';
import { ITask, TASK_STATUS } from '../../../../../db/models/task/types';
import TasksHandler from '../../../../../db/models/task';
import TaskImages from '../../../../(components)/taskImages';
import { getBucketFileUrls } from '../../../../(clients)/google';
import TaskInformation from '../../../../(components)/taskInformation';
import { getStatusColor } from '../../../../(util)/styles';
import Question from '../../../../../public/svgs/question';
import Task from '../../../../(components)/projects/task';
import HoverInfo from '../../../../(components)/hoverInfo';

export default async function Page() {
    const _headers = headers();
    const company = _headers.get('jwt-company') as string;
    const path: string = _headers.get('x-pathname') as string;
    const pathSplit: string[] = path.split('/');
    const taskId: string = pathSplit[pathSplit.length - 1];
    const projectId: string = pathSplit[pathSplit.length - 2];
    const task = (await TasksHandler.findById(
        taskId,
        company,
        projectId
    )) as ITask;
    const bucketFileUrls = await getBucketFileUrls(
        `projects/${projectId}/tasks/${task._id}`
    );

    function getTaskStatusText() {
        switch (task.status) {
            case TASK_STATUS.ASSIGNED:
                return 'A Piecework-BTC member has accepted this task. Waiting for completion.';
            case TASK_STATUS.UNASSIGNED:
                return 'Waiting for a Piecework-BTC member to accept this task.';
            case TASK_STATUS.ARCHIVED:
                return 'Task and payment completed. This task has been archived for your records.';
            case TASK_STATUS.PENDING_REVIEW:
                return 'Client should review the submission. If the client is satisfied, they should mark the task as complete below.';
            case TASK_STATUS.PENDING_PAYMENT:
                return 'Client has marked this task as complete. Payment is pending.';
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-end mb-2 items-center">
                <p
                    className={`${getStatusColor(
                        task.status
                    )} font-semibold mr-2`}
                >
                    {task.status}
                </p>
                <HoverInfo text={getTaskStatusText()} />
            </div>
            <TaskInformation
                taskId={task._id.toString()}
                _name={task.name}
                _desc={task.desc}
                price={task.price}
                projectId={projectId}
            />
            <TaskImages
                projectId={projectId}
                imageUrls={bucketFileUrls}
                taskId={task._id.toString()}
            />
        </div>
    );
}
