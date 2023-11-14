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
            await fetch(`/api/admin/projects`, {
                method: 'POST',
                body: JSON.stringify({ companyId }),
            })
                .then((res) => res.json())
                .then((data: { projects: IProject[] }) => {
                    console.log('Any data? ', data);
                    setProjects(data.projects);
                })
                .finally(() => setInitialLoad(false));
        }
        getProjects();
    }, []);

    function toggleConfirm(
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        project: IProject
    ) {}

    function toggleEdit(
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        project: IProject
    ) {}

    return (
        <div className="w-full h-96 flex">
            {initialLoad ? (
                Loading()
            ) : (
                <ProjectComponentList
                    projects={projects}
                    toggleConfirm={toggleConfirm}
                    toggleEdit={toggleEdit}
                    isAdmin
                />
            )}
        </div>
    );
}
