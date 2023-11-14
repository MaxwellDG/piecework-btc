import { headers } from 'next/headers';
import TasksHandler from '../../db/models/task';
import ActivityList from '../(components)/activity/activityList';
import HeroScreenContainer from '../(components)/containers/hero-screen-container';
import { TASK_STATUS } from '../../db/models/task/types';
import dbConnect from '../../db';
import ArrowCornersCard from '../(components)/containers/cards/arrow-corners';
import PendingActionList from '../(components)/pendingAction/pendingActionList';

export default async function Page() {
    await dbConnect();
    const _headers = headers();
    const companyId = _headers.get('jwt-company') as string;

    const tasksCompleted: number = await TasksHandler.countTasks(
        companyId,
        TASK_STATUS.ARCHIVED
    );
    const tasksCreated: number = await TasksHandler.countTasks(companyId);

    return (
        <HeroScreenContainer>
            <div className="flex flex-1 flex-col sm:overflow-y-auto xl:justify-center">
                <h2 className="text-4xl font-bold mb-8">Home</h2>
                <div className="flex flex-col h-96 xl:flex-row pr-2">
                    <div className="flex flex-1 flex-col mb-8 xl:mb-0 xl:mr-4">
                        <h3 className="text-lg mb-2 font-semibold">Activity</h3>
                        <ArrowCornersCard canOverflow>
                            <ActivityList />
                        </ArrowCornersCard>
                    </div>
                    <div className="flex flex-1 flex-col xl:ml-4">
                        <div className="flex flex-col mb-8 xl:mb-0">
                            <h3 className="text-lg mb-2 font-semibold">
                                Tasks
                            </h3>
                            <div className="flex w-full mb-2 gap-x-2">
                                <ArrowCornersCard>
                                    <span className="flex flex-1 p-2 rounded">
                                        <p className="inline font-bold">
                                            Created:&nbsp;
                                        </p>
                                        <p className="inline">{tasksCreated}</p>
                                    </span>
                                </ArrowCornersCard>
                                <ArrowCornersCard>
                                    <span className="flex flex-1 p-2 rounded">
                                        <p className="inline font-bold">
                                            Completed:&nbsp;
                                        </p>
                                        <p className="inline">
                                            {tasksCompleted}
                                        </p>
                                    </span>
                                </ArrowCornersCard>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col">
                            <h3 className="text-lg mb-2 font-semibold">
                                Pending Actions
                            </h3>
                            <ArrowCornersCard canOverflow>
                                <PendingActionList />
                            </ArrowCornersCard>
                        </div>
                    </div>
                </div>
            </div>
        </HeroScreenContainer>
    );
}
