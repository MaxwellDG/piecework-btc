'use client';

import { HydratedDocument } from 'mongoose';
import { ITask } from '../../../../db/modeling/task';
import React from 'react';
import Task from '../task';
import TaskComponentList from './componentList';

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
            setTasks(tasks?.tasks || []);
        }
        getTasks();
    }, []);

    return (
        <div className="flex flex-1 flex-col overflow-y-auto">
            <TaskComponentList tasks={tasks} />
        </div>
    );
}
