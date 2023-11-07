'use client';

import { MouseEvent } from 'react';
import { ITask } from '../../../../../db/models/task/types';
import Task from '../../task';

type Props = {
    tasks: ITask[];
    toggleDeleteModal: (
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        task: ITask
    ) => void;
};

export default function TaskComponentList({ tasks, toggleDeleteModal }: Props) {
    console.log('Wtf is tasks now: ', tasks);

    return (
        <div className="flex flex-1 flex-col overflow-y-auto pr-1 gap-y-2">
            {tasks?.length ? (
                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                    {(tasks ? tasks : []).map((task: ITask) => (
                        <Task
                            key={task._id}
                            task={task}
                            toggleDeleteModal={toggleDeleteModal}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-1 justify-center items-center">
                    <h3>No tasks yet</h3>
                </div>
            )}
        </div>
    );
}
