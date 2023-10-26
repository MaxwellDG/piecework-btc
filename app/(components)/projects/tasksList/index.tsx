'use client';

import React from 'react';
import TaskComponentList from './componentList';
import useSWR from 'swr';
import Loading from '../../loading';

type Props = {
    projectId: string;
};

export default function TasksList({ projectId }: Props) {
    const { data, isLoading, error } = useSWR(
        '/api/tasks/' + projectId,
        async function (url) {
            const res = await fetch(url);
            const data = await res.json();
            return data?.tasks ?? [];
        }
    );

    return (
        <div className="w-full h-96 flex">
            {isLoading ? Loading() : <TaskComponentList tasks={data} />}
        </div>
    );
}
