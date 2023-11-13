import Link from 'next/link';
import Chevron from '../../../../../public/svgs/chevron';
import ProjectsListAdmin from '../../../../(components)/projects/projectsList/admin';
import HeroScreenContainer from '../../../../(components)/containers/hero-screen-container';
import { usePathnameServer } from '../../../../(hooks)/useServerHeaders';
import BackButton from '../../../../(components)/ui/buttons/back';

export default function ProjectsAdmin() {
    const { id: companyId } = usePathnameServer();

    return (
        <HeroScreenContainer>
            <BackButton route={`/admin/dashboard`} />
            <div className="flex h-20 items-start">
                <h2 className="text-4xl font-bold mb-2">Projects</h2>
            </div>
            <ProjectsListAdmin companyId={companyId} />
        </HeroScreenContainer>
    );
}
