import React from 'react';
import {
    ActivityCRUD,
    ActivityType,
    IActivity,
} from '../../../db/models/activity/types';
import User from '../../../public/svgs/user';
import Projects from '../../../public/svgs/projects';
import Messages from '../../../public/svgs/messages';

type Props = {
    activity: IActivity;
};

export default function Activity({ activity }: Props) {
    const { text, createdAt, crud, type } = activity;

    const iconType = React.useMemo(() => {
        switch (type) {
            case ActivityType.MESSAGES:
                return Messages(20, '#F2A900');
            case ActivityType.USERS:
                return User('#F2A900', 20);
            default:
                return Projects(20, '#F2A900');
        }
    }, []);

    return (
        <div className="flex flex-col p-2 rounded mb-2">
            <div className="h-full flex w-full justify-between items-center mr-2">
                <div className="flex flex-1 items-center">
                    {iconType}
                    <p className="inline ml-2 font-semibold">{crud}</p>
                </div>
                <span className="flex justify-between items-center">
                    <span className="flex ">
                        <p className="inline text-lightGray text-xs">
                            {new Date(createdAt).toLocaleDateString()}&nbsp;
                        </p>
                        <p className="inline text-lightGray text-xs">
                            {new Date(createdAt).toLocaleTimeString()}
                        </p>
                    </span>
                </span>
            </div>
            <p>{text}</p>
        </div>
    );
}
