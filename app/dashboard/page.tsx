import Activity from '../(components)/activity';
import PendingAction from '../(components)/pendingAction';
import { Role } from '../../db/modeling/account';
import {
    ActivityCRUD,
    ActivityType,
    IActivity,
} from '../../db/modeling/activity';
import {
    IPendingAction,
    PendingActionType,
} from '../../db/modeling/pendingAction';

export default function Page() {
    // const activity: IActivity[] = await ActivityHandler.getActivity();
    // const activity: IPendingActions[] = await PendingActionsHandler.getPendingActions();
    // const account: IAccount = await AccountHandler.getAccount();

    const account = {
        username: 'Username',
        role: Role.ADMIN,
        password: 'password',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        messages: [],
        company: {
            name: 'Company',
            projects: [],
            tasksCompleted: 10,
            tasksCreated: 12,
        },
    };

    const activity = [
        {
            text: 'Test activity string',
            crud: ActivityCRUD.CREATED,
            type: ActivityType.USERS,
            createdAt: new Date(Date.now()),
        },
        {
            text: 'Test activity string2',
            crud: ActivityCRUD.DELETED,
            type: ActivityType.PROJECTS,
            createdAt: new Date(Date.now()),
        },
        {
            text: 'Test activity string3',
            crud: ActivityCRUD.READ,
            type: ActivityType.MESSAGES,
            createdAt: new Date(Date.now()),
        },
        {
            text: 'Test activity string4',
            crud: ActivityCRUD.UPDATED,
            type: ActivityType.PROJECTS,
            createdAt: new Date(Date.now()),
        },
    ];

    const pendingActions = [
        {
            text: 'Test pending action',
            type: PendingActionType.PAYMENT,
            targetId: 335,
            createdAt: new Date(Date.now()),
            isFailed: true,
        },
        {
            text: 'Test pending action 2',
            type: PendingActionType.PAYMENT,
            targetId: 3352,
            createdAt: new Date(Date.now()),
            isFailed: false,
        },
    ];

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-3xl">
                <h2 className="text-3xl font-bold mb-2">Home</h2>
                <div className="flex">
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
                                    <p className="inline">
                                        {account?.company?.tasksCreated}
                                    </p>
                                </span>
                                <span className="flex flex-1 bg-gray-200 p-2 rounded ml-2">
                                    <p className="inline font-bold">
                                        Completed:&nbsp;
                                    </p>
                                    <p className="inline">
                                        {account?.company?.tasksCompleted}
                                    </p>
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
