import Link from 'next/link';
import Chevron from '../../../../../public/svgs/chevron';
import usePathnameServer from '../../../../(hooks)/usePathnameServer';
import TasksListAdmin from '../../../../(components)/projects/tasksList/admin';

export default function TasksAdmin() {
    const { id: projectId } = usePathnameServer();

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-3xl">
                <div className="w-full flex flex-start mb-12">
                    <Link href="/admin/dashboard">
                        {Chevron('black', 30, 180)}
                    </Link>
                </div>
                <div className="flex h-20 items-start">
                    <h2 className="text-4xl font-bold mb-2">Tasks</h2>
                </div>
                <TasksListAdmin projectId={projectId} />
            </div>
        </div>
    );
}
