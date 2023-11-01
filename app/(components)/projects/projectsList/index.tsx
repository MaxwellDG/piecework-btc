'use client';

import React from 'react';
import Loading from '../../loading';
import useSWR from 'swr';
import ProjectComponentList from './componentList';

export default function ProjectsList() {
    const { data, error, isLoading } = useSWR('/api/projects', async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        return data?.projects ?? [];
    });

    return (
        <div className="w-full h-96 flex">
            {isLoading ? Loading() : <ProjectComponentList projects={data} />}
        </div>
    );
}
