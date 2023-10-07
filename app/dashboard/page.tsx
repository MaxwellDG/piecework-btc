import Activity from '../(components)/activity';
import Company from '../(components)/companies/company';
import PendingAction from '../(components)/pendingAction';
import ActivityHandler, { IActivity } from '../../db/modeling/activity';
import PendingActionsHandler, {
    IPendingAction,
} from '../../db/modeling/pendingAction';
import TasksHandler, { TASK_STATUS } from '../../db/modeling/task';

export default async function Page() {
    const { companyId } = { companyId: '6515cfa37b8c4ebb9679801d' }; // todo get this info from JWT

    const activity: IActivity[] = await ActivityHandler.getActivity(companyId);
    const pendingActions: IPendingAction[] =
        await PendingActionsHandler.getPendingActions(companyId);
    const tasksCompleted: number = await TasksHandler.countTasksOfStatus(
        companyId,
        TASK_STATUS.COMPLETED
    );
    const tasksCreated: number =
        await TasksHandler.countTasksOfStatus(companyId); // todo ensure this works when status is undefined for the count

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-3xl">
                <h2 className="text-3xl font-bold mb-2">Home</h2>
                <div className="flex h-96">
                    <div className="flex flex-1 flex-col mr-4">
                        <h3 className="text-lg mb-2 font-semibold">Activity</h3>
                        <div className="bg-gray-200 flex flex-1 flex-col">
                            {activity.length === 0 ? (
                                <div className="flex flex-1 justify-center items-center">
                                    <p className="font-semibold">
                                        No recent activity
                                    </p>
                                </div>
                            ) : (
                                activity.map(
                                    (activity: IActivity, i: number) => (
                                        <Activity key={i} activity={activity} />
                                    )
                                )
                            )}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col ml-4">
                        <div className="flex flex-col ">
                            <h3 className="text-lg mb-2 font-semibold">
                                Tasks
                            </h3>
                            <div className="flex w-full mb-2">
                                <span className="flex flex-1 bg-gray-200 p-2 rounded mr-1">
                                    <p className="inline font-bold">
                                        Created:&nbsp;
                                    </p>
                                    <p className="inline">{tasksCreated}</p>
                                </span>
                                <span className="flex flex-1 bg-gray-200 p-2 rounded ml-2">
                                    <p className="inline font-bold">
                                        Completed:&nbsp;
                                    </p>
                                    <p className="inline">{tasksCompleted}</p>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col ">
                            <h3 className="text-lg mb-2 font-semibold">
                                Pending Actions
                            </h3>
                            <div className="flex flex-1 flex-col bg-gray-200">
                                {pendingActions.length === 0 ? (
                                    <div className="flex flex-1 justify-center items-center">
                                        <p className="font-semibold">
                                            No pending actions
                                        </p>
                                    </div>
                                ) : (
                                    pendingActions.map(
                                        (
                                            pendingAction: IPendingAction,
                                            i: number
                                        ) => (
                                            <div
                                                className={
                                                    i !==
                                                    pendingActions.length - 1
                                                        ? 'mb-2'
                                                        : ''
                                                }
                                            >
                                                <PendingAction
                                                    key={i}
                                                    pendingAction={
                                                        pendingAction
                                                    }
                                                />
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
