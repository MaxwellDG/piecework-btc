import { IProject } from '../../../../../db/models/project/types';
import Project from '../../project';

type Props = {
    projects: IProject[];
};

export default function ProjectComponentList({ projects }: Props): JSX.Element {
    return (
        <div className="flex flex-1 flex-col overflow-y-auto pr-1 gap-y-2">
            {projects.length ? (
                <div className="flex flex-col gap-y-2">
                    {projects.map((project) => (
                        <Project key={project._id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-1 justify-center items-center">
                    <h3>No projects yet</h3>
                </div>
            )}
        </div>
    );
}
