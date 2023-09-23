import React from 'react';
import {
    ActivityCRUD,
    ActivityType,
    IActivity,
} from '../../../db/modeling/activity';
import User from '../../../public/svgs/user';
import Projects from '../../../public/svgs/projects';
import Messages from '../../../public/svgs/messages';
import {
    IPendingAction,
    PendingActionType,
} from '../../../db/modeling/pendingAction';
import Alert from '../../../public/svgs/alert';
import Link from 'next/link';

type Props = {
    pendingAction: IPendingAction;
};

export default function PendingAction({ pendingAction }: Props) {
    const { text, type, targetId, isFailed } = pendingAction;

    const route = React.useMemo(() => {
        switch (type) {
            case PendingActionType.PAYMENT:
                return `/dashboard/projects/task/${targetId}`;
        }
    }, []);

    return (
        <Link href={route} className="flex p-2 rounded bg-gray-200 mb-2">
            <div className="h-full flex justify-center items-center mr-2">
                {Alert(isFailed ? 'red' : 'yellow', 30)}
            </div>
            <span>
                <p>{text}</p>
            </span>
        </Link>
    );
}
