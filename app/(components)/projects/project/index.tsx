import Link from 'next/link';
import { IProject } from '../../../../db/modeling/project';
import Chevron from '../../../../public/svgs/chevron';

type Props = {
    project: IProject;
};

export default function Project({ project }: Props) {
    const { _id, name, company, updatedAt, createdAt } = project;

    return (
        <Link
            href={`/dashboard/projects/${_id}`}
            className="w-full p-2 flex justify-between border items-center"
        >
            <div>
                <p>{name}</p>
            </div>
            {Chevron('black', 15)}
        </Link>
    );
}
