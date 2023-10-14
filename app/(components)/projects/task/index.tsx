import Link from 'next/link';
import Chevron from '../../../../public/svgs/chevron';
import { ITask } from '../../../../db/modeling/task';

type Props = {
    task: ITask;
};

export default function Task({ task }: Props) {
    const { _id, name, project, updatedAt, createdAt, status } = task;

    return (
        <Link
            href={`/dashboard/projects/${project.id}/${task._id}`}
            className="w-full p-2 items-center flex justify-between border"
        >
            <div>
                <p>{name}</p>
            </div>
            {Chevron('black', 15)}
        </Link>
    );
}
