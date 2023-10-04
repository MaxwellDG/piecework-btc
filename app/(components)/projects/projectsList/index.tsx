'use client';

import React, { Suspense } from 'react';
import { IProject } from '../../../../db/modeling/project';
import Project from '../project';
import Loading from '../../loading';

export default function ProjectsList() {
    const [projects, setProjects] = React.useState<IProject[]>(
        [] as IProject[]
    );

    React.useEffect(() => {
        async function getProjects() {
            const projects: { projects: IProject[] } = await fetch(
                '/api/projects'
            ).then((res) => res.json());
            setProjects(projects.projects);
        }
        getProjects();
    }, []);

    return (
        <div className="w-full h-96 flex">
            <Suspense fallback={Loading()}>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    {projects.length ? (
                        projects.map((project) => (
                            <Project key={project._id} project={project} />
                        ))
                    ) : (
                        <div className="flex flex-1 justify-center items-center">
                            <h3>No projects yet</h3>
                        </div>
                    )}
                </div>
            </Suspense>
        </div>
    );
}
