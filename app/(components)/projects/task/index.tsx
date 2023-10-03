import Link from 'next/link';
import Chevron from '../../../../public/svgs/chevron';
import { ITask } from '../../../../db/modeling/task';

type Props = {
    task: ITask;
};

export default function Task({ task }: Props) {
    const { id, name, project, updatedAt, createdAt, status } = task;

    return (
        <Link
            href={`/dashboard/projects/${project.id}/${task.id}`}
            className="w-full p-2 mb-2 flex justify-between border"
        >
            <div>
                <p>{name}</p>
            </div>
            {Chevron('black', 25)}
        </Link>
    );
}
