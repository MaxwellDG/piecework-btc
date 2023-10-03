import Link from 'next/link';
import { IProject } from '../../../../db/modeling/project';
import Chevron from '../../../../public/svgs/chevron';

type Props = {
    project: IProject;
};

export default function Project({ project }: Props) {
    const { id, name, company, updatedAt, createdAt } = project;

    return (
        <Link
            href={`/dashboard/projects/${project.id}`}
            className="w-full p-2 mb-2 flex justify-between border"
        >
            <div>
                <p>{name}</p>
            </div>
            {Chevron('black', 25)}
        </Link>
    );
}
