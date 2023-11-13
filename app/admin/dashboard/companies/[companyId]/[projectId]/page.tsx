import { usePathnameServer } from '../../../../../(hooks)/useServerHeaders';
import TasksListAdmin from '../../../../../(components)/projects/tasksList/admin';
import BackButton from '../../../../../(components)/ui/buttons/back';
import HeroScreenContainer from '../../../../../(components)/containers/hero-screen-container';
import { headers } from 'next/headers';

export default function TasksAdmin() {
    const _headers = headers();
    // x-pathname header added in middleware
    const path: string = _headers.get('x-pathname') as string;
    const pathSplit: string[] = path.split('/');
    const projectId: string = pathSplit[pathSplit.length - 1];
    const companyId: string = pathSplit[pathSplit.length - 2];

    return (
        <HeroScreenContainer>
            <BackButton route={`/admin/dashboard/companies/${companyId}`} />
            <div className="flex h-20 items-start">
                <h2 className="text-4xl font-bold mb-2">Tasks</h2>
            </div>
            <TasksListAdmin projectId={projectId} />
        </HeroScreenContainer>
    );
}
