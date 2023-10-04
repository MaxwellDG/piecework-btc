'use client';

import { HydratedDocument } from 'mongoose';
import { ITask } from '../../../../db/modeling/task';
import React from 'react';
import Task from '../task';

type Props = {
    projectId: string;
};

export default function TasksList({ projectId }: Props) {
    const [tasks, setTasks] = React.useState<ITask[]>([] as ITask[]);
    React.useEffect(() => {
        async function getTasks() {
            const tasks: { tasks: ITask[] } | null = await fetch(
                `/api/tasks/${projectId}`
            ).then((res) => res.json());
            console.log('retreived tasks: ', tasks);
            setTasks(tasks?.tasks || []);
        }
        getTasks();
    }, []);

    return (
        <div className="flex flex-1 flex-col overflow-y-auto">
            {tasks?.length ? (
                tasks.map((task) => <Task key={task._id} task={task} />)
            ) : (
                <div className="flex flex-1 justify-center items-center">
                    <h3>No tasks yet</h3>
                </div>
            )}
        </div>
    );
}
