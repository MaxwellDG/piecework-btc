import Link from 'next/link';
import { ITask } from '../../../../db/models/task/types';
import ArrowCornersCard from '../../containers/cards/arrow-corners';
import { getStatusColor } from '../../../(util)/styles';

type Props = {
    task: ITask;
};

export default function Task({ task }: Props) {
    const { _id, name, desc, price, project, updatedAt, createdAt, status } =
        task;

    return (
        <ArrowCornersCard className="w-1/2">
            <Link
                href={`/dashboard/projects/${project}/${task._id}`}
                className=" h-24 p-2 flex hover:bg-[rgba(255,255,255,0.1)]"
            >
                <div className="w-full flex flex-col ml-2">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold">{name}</p>
                        <p className={`${getStatusColor(status)}`}>{status}</p>
                    </div>
                    <div className="w-[75%] flex flex-1 overflow-hidden text-ellipsis">
                        {desc}
                    </div>
                </div>
            </Link>
        </ArrowCornersCard>
    );
}
