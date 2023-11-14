'use client';

import useSWR from 'swr';
import { useState } from 'react';
import PendingAction from '../../../(components)/pendingAction';
import Loading from '../../loading';
import { IPendingAction } from '../../../../db/models/pendingAction/types';

export default function PendingActionList() {
    const { data, isLoading, error } = useSWR(
        '/api/pendingActions',
        async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            return data?.pendingActions ?? [];
        }
    );
    const [limit, setLimit] = useState(3);

    if (isLoading) return Loading();

    if (data?.length === 0) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <p className="font-semibold">No pending actions</p>
            </div>
        );
    } else {
        return (
            <div>
                <div className="hidden xl:flex flex-col">
                    {data.map((pendingAction: IPendingAction, i: number) => (
                        <div
                            key={i}
                            className={i !== data.length - 1 ? 'mb-2' : ''}
                        >
                            <PendingAction
                                key={i}
                                pendingAction={pendingAction}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col xl:hidden">
                    {data
                        .slice(0, limit)
                        .map((pendingAction: IPendingAction, i: number) => (
                            <div
                                key={i}
                                className={i !== data.length - 1 ? 'mb-2' : ''}
                            >
                                <PendingAction
                                    key={i}
                                    pendingAction={pendingAction}
                                />
                            </div>
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
