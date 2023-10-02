import AddProject from '../../(components)/projects/addProject';
import Add from '../../../public/svgs/add';

export default function Projects() {
    return (
        <div className="hero min-h-screen w-full bg-base-200">
            <div className="flex justify-between w-full">
                <h2 className="text-3xl font-bold mb-2">Projects</h2>
                <AddProject />
            </div>
        </div>
    );
}
