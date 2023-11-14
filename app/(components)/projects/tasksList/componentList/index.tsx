'use client';

import { ITask } from '../../../../../db/models/task/types';
import Task from '../../task';

type Props = {
    tasks: ITask[];
    isAdmin: boolean;
    toggleDeleteModal: (
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        task: ITask
    ) => void;
};

export default function TaskComponentList({
    tasks,
    toggleDeleteModal,
    isAdmin,
}: Props) {
    return (
        <div className="flex flex-1 flex-col sm:overflow-y-auto pr-1 gap-y-2">
            {tasks?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
                    {(tasks ? tasks : []).map((task: ITask) => (
                        <Task
                            key={task._id}
                            task={task}
                            toggleDeleteModal={toggleDeleteModal}
                            isAdmin={isAdmin}
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
