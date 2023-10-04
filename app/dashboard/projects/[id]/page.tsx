import React, { Suspense } from 'react';
import Loading from '../../../(components)/loading';
import { headers } from 'next/headers';
import AddTask from '../../../(components)/projects/addTask';
import TasksList from '../../../(components)/projects/tasksList';

type Props = {
    searchParams: Record<string, string> | null;
};

export default function Tasks({ searchParams }: Props) {
    const _headers = headers();
    const path: string = _headers.get('x-invoke-path') as string;
    const pathSplit: string[] = path.split('/');
    const projectId: string = pathSplit[pathSplit.length - 1];

    return (
        <div className="w-full h-96 flex flex-col">
            <div className="flex justify-between">
                <h2 className="text-3xl font-bold mb-2">Tasks</h2>
                <AddTask
                    projectId={projectId}
                    modalOpen={!!searchParams?.modal}
                    path={path}
                />
            </div>
            <Suspense fallback={Loading()}>
                <TasksList projectId={projectId} />
            </Suspense>
        </div>
    );
}
