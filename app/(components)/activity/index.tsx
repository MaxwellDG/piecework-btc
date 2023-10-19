import React from 'react';
import {
    ActivityCRUD,
    ActivityType,
    IActivity,
} from '../../../db/modeling/activity/types';
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
                return Messages('black', 30);
            case ActivityType.PROJECTS:
                return Projects('black', 30);
            case ActivityType.USERS:
                return User('black', 30);
        }
    }, []);

    return (
        <div className="flex p-2 rounded mb-2">
            <div className="h-full flex justify-center items-center mr-2">
                {iconType}
            </div>
            <div className="w-full">
                <span className="w-full flex justify-between items-center">
                    <p className="inline">{crud}</p>
                    <span className="flex ">
                        <p className="inline text-gray-600 text-xs">
                            {new Date(createdAt).toLocaleDateString()}&nbsp;
                        </p>
                        <p className="inline text-gray-600 text-xs">
                            {new Date(createdAt).toLocaleTimeString()}
                        </p>
                    </span>
                </span>
                <p>{text}</p>
            </div>
        </div>
    );
}
