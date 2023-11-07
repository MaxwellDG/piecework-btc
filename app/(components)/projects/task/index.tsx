import Link from 'next/link';
import { ITask } from '../../../../db/models/task/types';
import ArrowCornersCard from '../../containers/cards/arrow-corners';
import { getStatusColor } from '../../../(util)/styles';
import Delete from '../../../../public/svgs/delete';

type Props = {
    task: ITask;
    toggleDeleteModal: (
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        task: ITask
    ) => void;
};

export default function Task({ task, toggleDeleteModal }: Props) {
    const { _id, name, desc, price, project, updatedAt, createdAt, status } =
        task;

    return (
        <Link
            href={`/dashboard/projects/${project}/${task._id}`}
            className="group"
        >
            <ArrowCornersCard
                header={
                    <div className="flex w-full justify-between items-center">
                        <div className="w-48">
                            <p className="text-lg font-semibold block whitespace-nowrap overflow-hidden text-ellipsis">
                                {name}
                            </p>
                        </div>
                        <button
                            className="absolute right-0.5 top-0 bottom-0"
                            type="button"
                            onClick={(e) => toggleDeleteModal(e, true, task)}
                        >
                            {Delete(30)}
                        </button>
                    </div>
                }
            >
                <div className="w-full h-20 flex flex-col p-2 group-hover:bg-[rgba(255,255,255,0.1)]">
                    <div className="w-full flex flex-1 overflow-hidden text-ellipsis block">
                        {desc}
                    </div>
                </div>
            </ArrowCornersCard>
        </Link>
    );
}
