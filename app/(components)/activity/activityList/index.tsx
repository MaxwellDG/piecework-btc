'use client';

import useSWR from 'swr';
import Activity from '..';
import { IActivity } from '../../../../db/models/activity/types';
import Loading from '../../loading';

export default function ActivityList() {
    const { data, isLoading, error } = useSWR('/api/activity', async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        return data?.activities ?? [];
    });

    if (isLoading) return Loading();

    if (data?.length === 0) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <p className="font-semibold">No recent activity</p>
            </div>
        );
    } else {
        return data?.map((activity: IActivity, i: number) => (
            <Activity key={i} activity={activity} />
        ));
    }
}
