import { headers } from 'next/headers';
import { ITask } from '../../../../../../../db/models/task/types';
import TasksHandler from '../../../../../../../db/models/task';
import { getBucketFileUrls } from '../../../../../../(clients)/google';
import { getStatusColor } from '../../../../../../(util)/styles';
import NextImage from 'next/image';
import TaskImage from '../../../../../../(components)/taskImages/image';
import HeroScreenContainer from '../../../../../../(components)/containers/hero-screen-container';
import BackButton from '../../../../../../(components)/ui/buttons/back';
import MainContent from '../../../../../../(components)/containers/main-content';
import ProjectsHandler from '../../../../../../../db/models/project';
import CompanyHandler from '../../../../../../../db/models/company';
import { IProject } from '../../../../../../../db/models/project/types';
import { HydratedDocument } from 'mongoose';

export default async function Page() {
    const _headers = headers();
    const path: string = _headers.get('x-pathname') as string;
    const pathSplit: string[] = path.split('/');
    const taskId: string = pathSplit[pathSplit.length - 1];
    const projectId: string = pathSplit[pathSplit.length - 2];
    const companyId: string = pathSplit[pathSplit.length - 3];
    const task = (await TasksHandler.findById(
        taskId,
        companyId,
        projectId
    )) as ITask;
    const bucketFileUrls = await getBucketFileUrls(
        `projects/${projectId}/tasks/${task._id}`
    );

    // Update task, project, and company's viewedByAdmin statuses
    (async function () {
        await TasksHandler.update(task._id, companyId, projectId, {
            viewedBySuperAdmin: true,
        });
        const allTasksOfProject: HydratedDocument<ITask>[] =
            await TasksHandler.findByProjectId(companyId, projectId);
        const anyTasksUnviewed = allTasksOfProject.some(
            (task: HydratedDocument<ITask>) => !task.viewedBySuperAdmin
        );
        if (!anyTasksUnviewed) {
            await ProjectsHandler.update(projectId, companyId, {
                viewedBySuperAdmin: true,
            });
            const allProjectsOfCompany: HydratedDocument<IProject>[] =
                await ProjectsHandler.findByCompanyId(companyId);
            const anyProjectsUnviewed = allProjectsOfCompany.some(
                (project: HydratedDocument<IProject>) =>
                    !project.viewedBySuperAdmin
            );
            if (!anyProjectsUnviewed) {
                await CompanyHandler.update(companyId, {
                    viewedBySuperAdmin: true,
                });
            }
        }
    })();

    return (
        <HeroScreenContainer>
            <BackButton
                route={`/admin/dashboard/companies/${companyId}/${projectId}`}
            />
            <MainContent>
                <div className="flex flex-col m-auto w-full">
                    <div className="flex justify-end mb-2 items-center">
                        <p
                            className={`${getStatusColor(
                                task.status
                            )} font-semibold mr-2`}
                        >
                            {task.status}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between mb-4 items-center">
                            <p>{task.name}</p>
                            <div className="flex items-center">
                                <p className="mr-2">{task.price}</p>
                                <NextImage
                                    src="/btc-logo.png"
                                    height={24}
                                    width={24}
                                    alt="btc-logo"
                                />
                            </div>
                        </div>
                        <p>{task.desc}</p>
                    </div>
                    <div className="flex flex-1 gap-x-2 overflow-x-auto max-w-[90vw] sm:max-w-[70vw] pb-2">
                        {bucketFileUrls.map((imageUrl, index) => (
                            <TaskImage
                                key={imageUrl}
                                imageUrl={imageUrl}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </MainContent>
        </HeroScreenContainer>
    );
}
