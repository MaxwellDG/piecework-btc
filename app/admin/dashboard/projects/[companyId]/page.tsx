import ProjectsList from '../../../../(components)/projects/projectsList';
import Link from 'next/link';
import Chevron from '../../../../../public/svgs/chevron';
import ProjectsListAdmin from '../../../../(components)/projects/projectsList/admin';
import usePathnameServer from '../../../../(hooks)/usePathnameServer';

export default function ProjectsAdmin() {
    const { id: companyId } = usePathnameServer();

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-3xl">
                <div className="w-full flex flex-start mb-12">
                    <Link href="/admin/dashboard">
                        {Chevron('black', 30, 180)}
                    </Link>
                </div>
                <div className="flex h-20 items-start">
                    <h2 className="text-4xl font-bold mb-2">Projects</h2>
                </div>
                <ProjectsListAdmin companyId={companyId} />
            </div>
        </div>
    );
}
