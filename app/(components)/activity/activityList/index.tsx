'use client';

import useSWR from 'swr';
import { useState } from 'react';
import Activity from '..';
import { IActivity } from '../../../../db/models/activity/types';
import Loading from '../../loading';

export default function ActivityList() {
    const { data, isLoading, error } = useSWR('/api/activity', async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        return data?.activities ?? [];
    });
    const [limit, setLimit] = useState(3);

    if (isLoading) return Loading();

    if (data?.length === 0) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <p className="font-semibold">No recent activity</p>
            </div>
        );
    } else {
        return (
            <div>
                <div className="hidden xl:flex flex-col">
                    {data?.map((activity: IActivity, i: number) => (
                        <Activity key={i} activity={activity} />
                    ))}
                </div>
                <div className="flex flex-col xl:hidden">
                    {data
                        .slice(0, limit)
                        ?.map((activity: IActivity, i: number) => (
                            <Activity key={i} activity={activity} />
                        ))}
                </div>
                <div className="flex flex-row justify-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] cursor-pointer xl:hidden">
                    {data.length > limit && (
                        <button
                            className="w-full"
                            onClick={() => setLimit((prev) => prev + 3)}
                        >
                            <p className="text-teal">See more</p>
                        </button>
                    )}
                </div>
            </div>
        );
    }
}
