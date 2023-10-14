import { ITask } from '../../../../../db/modeling/task';
import Task from '../../task';

type Props = {
    tasks: ITask[];
};

export default function TaskComponentList({ tasks }: Props) {
    return (
        <div className="flex flex-1 flex-col overflow-y-auto pr-1">
            {tasks?.length ? (
                <div className="flex flex-col gap-y-2">
                    {tasks.map((task) => (
                        <Task key={task._id} task={task} />
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
