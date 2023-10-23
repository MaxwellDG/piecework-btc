import BackButton from '../../../../(components)/buttons/back';
import HeroScreenContainer from '../../../../(components)/containers/hero-screen-container';
import Loading from '../../../../(components)/loading';
import ProjectsHandler from '../../../../../db/modeling/project';
import TasksHandler from '../../../../../db/modeling/task';
import { headers } from 'next/headers';

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const _headers = headers();
    const company = _headers.get('jwt-company') as string;
    const path: string = _headers.get('x-invoke-path') as string;
    const pathSplit: string[] = path.split('/');
    const taskId: string = pathSplit[pathSplit.length - 1];
    const projectId: string = pathSplit[pathSplit.length - 2];
    const task = await TasksHandler.findById(taskId, company, projectId);

    return (
        <HeroScreenContainer>
            <BackButton route={`/dashboard/projects/${projectId}`} />
            {!task ? (
                Loading()
            ) : (
                <div className="m-auto w-full max-w-4xl">{children}</div>
            )}
        </HeroScreenContainer>
    );
}
