import { IProject } from '../../../../../db/models/project/types';
import Project from '../../project';

type Props = {
    projects: IProject[];
    toggleConfirm: (
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        project: IProject
    ) => void;
    toggleEdit: (
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        project: IProject
    ) => void;
};

export default function ProjectComponentList({
    projects,
    toggleConfirm,
    toggleEdit,
}: Props): JSX.Element {
    return (
        <div className="flex flex-1 flex-col sm:overflow-y-auto pr-1 gap-y-2 h-full">
            {projects.length ? (
                <div className="flex flex-col gap-y-2">
                    {projects.map((project) => (
                        <Project
                            key={project._id}
                            project={project}
                            toggleConfirm={toggleConfirm}
                            toggleEdit={toggleEdit}
                        />
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
