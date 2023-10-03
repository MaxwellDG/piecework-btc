import AddProject from '../../(components)/projects/addProject';
import ProjectsList from '../../(components)/projects/projectsList';
import Add from '../../../public/svgs/add';

export default function Projects() {
    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-3xl">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold mb-2">Projects</h2>
                    <AddProject />
                </div>
                <ProjectsList />
            </div>
        </div>
    );
}
