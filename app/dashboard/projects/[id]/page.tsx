import { Suspense } from 'react';
import TasksHandler, { ITask } from '../../../../db/modeling/task';
import Project from '../project';
import Loading from '../../loading';
import { usePathname } from 'next/navigation';

export default async function Project() {
    const id = usePathname();

    const tasks: ITask[] = await TasksHandler.findByProjectId(
        '6515cfa37b8c4ebb9679801d',
        id
    ); // todo use jwt

    return (
        <div className="w-full h-96 flex">
            <Suspense fallback={Loading()}>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    {tasks.length ? (
                        tasks.map((task) => <Task task={task} />)
                    ) : (
                        <div className="flex flex-1 justify-center items-center">
                            <h3>No tasks yet</h3>
                        </div>
                    )}
                </div>
            </Suspense>
        </div>
    );
}
