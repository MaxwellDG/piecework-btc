'use client';

import { ITask } from '../../../../../db/models/task/types';
import React from 'react';
import TaskComponentList from './../componentList';

type Props = {
    projectId: string;
    companyId: string;
};

export default function TasksListAdmin({ projectId, companyId }: Props) {
    const [tasks, setTasks] = React.useState<ITask[]>([] as ITask[]);
    React.useEffect(() => {
        async function getTasks() {
            const tasks: { tasks: ITask[] } | null = await fetch(
                `/api/admin/tasks`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        projectId,
                        companyId,
                    }),
                }
            ).then((res) => res.json());
            setTasks(tasks?.tasks || []);
        }
        getTasks();
    }, []);

    function toggleDeleteModal(
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        task: ITask
    ) {}

    return (
        <div className="flex h-96 flex-col overflow-y-auto">
            <TaskComponentList
                tasks={tasks}
                toggleDeleteModal={toggleDeleteModal}
                isAdmin
            />
        </div>
    );
}
