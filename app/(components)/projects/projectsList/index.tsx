import { Suspense } from 'react';
import ProjectsHandler, { IProject } from '../../../../db/modeling/project';
import Project from '../project';
import Loading from '../../loading';

export default async function ProjectsList() {
    const projects: IProject[] = await ProjectsHandler.findProjectsByCompanyId(
        '6515cfa37b8c4ebb9679801d'
    ); // todo use jwt

    return (
        <div className="w-full h-96 flex">
            <Suspense fallback={Loading()}>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    {projects.length ? (
                        projects.map((project) => <Project project={project} />)
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
