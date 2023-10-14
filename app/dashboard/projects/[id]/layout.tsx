import HeroScreenContainer from '../../../(components)/containers/hero-screen-container';
import { usePathnameServer } from '../../../(hooks)/useServerHeaders';
import ProjectsHandler from '../../../../db/modeling/project';
import { headers } from 'next/headers';

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const _headers = headers();
    const company = _headers.get('jwt-company') as string;
    const { id } = usePathnameServer();
    const project = await ProjectsHandler.findById(id, company);

    return (
        <HeroScreenContainer>
            <h2 className="text-4xl font-bold mb-8">{project?.name}</h2>
            <div className="m-auto w-full max-w-4xl">{children}</div>
        </HeroScreenContainer>
    );
}
