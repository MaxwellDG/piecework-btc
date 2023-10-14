import React, { Suspense } from 'react';
import Loading from '../../../(components)/loading';
import AddTask from '../../../(components)/projects/addTask';
import TasksList from '../../../(components)/projects/tasksList';
import { usePathnameServer } from '../../../(hooks)/useServerHeaders';

type Props = {
    searchParams: Record<string, string> | null;
};

export default function Tasks({ searchParams }: Props) {
    const { id: projectId, path } = usePathnameServer();

    return (
        <div className="w-full h-96 flex flex-col">
            <div className="flex justify-between">
                <h2 className="text-4xl font-bold mb-2">Tasks</h2>
                <AddTask
                    projectId={projectId}
                    modalOpen={!!searchParams?.modal}
                    path={path}
                />
            </div>
            <TasksList projectId={projectId} />
        </div>
    );
}
