'use client';

import { HydratedDocument } from 'mongoose';
import { ITask } from '../../../../db/modeling/task';
import React from 'react';
import Task from '../task';

type Props = {
    projectId: string;
};

export default function TasksList({ projectId }: Props) {
    const [tasks, setTasks] = React.useState<HydratedDocument<ITask>[]>(
        [] as HydratedDocument<ITask>[]
    );
    React.useEffect(() => {
        async function getTasks() {
            const tasks: HydratedDocument<ITask>[] | null = await fetch(
                `/api/tasks/${projectId}`
            ).then((res) => res.json());
            setTasks(tasks || []);
        }
        getTasks();
    }, []);

    return (
        <div className="flex flex-1 flex-col overflow-y-auto">
            {tasks?.length ? (
                tasks.map((task) => <Task key={task.id} task={task} />)
            ) : (
                <div className="flex flex-1 justify-center items-center">
                    <h3>No tasks yet</h3>
                </div>
            )}
        </div>
    );
}
