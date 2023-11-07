import Link from 'next/link';
import Chevron from '../../../../../public/svgs/chevron';
import ProjectsListAdmin from '../../../../(components)/projects/projectsList/admin';
import HeroScreenContainer from '../../../../(components)/containers/hero-screen-container';
import { usePathnameServer } from '../../../../(hooks)/useServerHeaders';

export default function ProjectsAdmin() {
    const { id: companyId } = usePathnameServer();

    return (
        <HeroScreenContainer>
            <div className="w-full flex flex-start mb-12">
                <Link href="/admin/dashboard">
                    {Chevron(30, undefined, 180)}
                </Link>
            </div>
            <div className="flex h-20 items-start">
                <h2 className="text-4xl font-bold mb-2">Projects</h2>
            </div>
            <ProjectsListAdmin companyId={companyId} />
        </HeroScreenContainer>
    );
}
