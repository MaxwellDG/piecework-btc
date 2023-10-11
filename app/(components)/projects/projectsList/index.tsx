'use client';

import React from 'react';
import Loading from '../../loading';
import useSWR from 'swr';
import ProjectComponentList from './componentList';
import { fetcher } from '../../../(util)/swr';

export default function ProjectsList() {
    const { data, error, isLoading } = useSWR('/api/projects', fetcher);

    return (
        <div className="w-full h-96 flex">
            {isLoading ? Loading() : <ProjectComponentList projects={data} />}
        </div>
    );
}
