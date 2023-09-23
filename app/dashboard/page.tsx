import Activity from '../(components)/activity';
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
    // const activity = await ActivityHandler.getActivity();
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
                <h2 className="text-xl font-bold mb-2">Home</h2>
                <div className="flex">
                    <div className="flex flex-1 flex-col mr-4">
                        <h3 className="text-lg mb-2">Activity</h3>
                        {activity.map((activity: IActivity, i: number) => (
                            <Activity activity={activity} />
                        ))}
                    </div>
                    <div className="flex flex-1 flex-col ml-4">
                        <h3 className="text-lg mb-2">Pending Actions</h3>
                        {pendingActions.map(
                            (pendingAction: IPendingAction, i: number) => (
                                <PendingAction pendingAction={pendingAction} />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
