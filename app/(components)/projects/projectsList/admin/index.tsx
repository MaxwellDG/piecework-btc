'use client';

import React, { Suspense } from 'react';
import { IProject } from '../../../../../db/models/project/types';
import Loading from '../../../loading';
import ProjectComponentList from './../componentList';

type Props = {
    companyId: string;
};

export default function ProjectsListAdmin({ companyId }: Props) {
    const [projects, setProjects] = React.useState<IProject[]>(
        [] as IProject[]
    );
    const [initialLoad, setInitialLoad] = React.useState<boolean>(true);

    React.useEffect(() => {
        async function getProjects() {
            await fetch(`/api/admin/projects/${companyId}`)
                .then((res) => res.json())
                .then((data: { projects: IProject[] }) =>
                    setProjects(data.projects)
                )
                .finally(() => setInitialLoad(false));
        }
        getProjects();
    }, []);

    return (
        <div className="w-full h-96 flex">
            {initialLoad ? (
                Loading()
            ) : (
                <ProjectComponentList projects={projects} />
            )}
        </div>
    );
}
