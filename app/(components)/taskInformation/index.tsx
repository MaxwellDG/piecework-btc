'use client';

import { useEffect, useState } from 'react';
import { ITask } from '../../../db/modeling/task/types';

type Props = {
    _name: string;
    _desc: string;
};

export default function TaskInformation({ _name, _desc }: Props) {
    const [desc, setDesc] = useState(_desc);
    const [name, setName] = useState(_name);

    useEffect(() => {
        return () => {
            // todo update
        };
    }, []);

    return (
        <div className="flex flex-col">
            <input
                className="text-3xl font-semibold mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                className="mb-8 h-32 p-1"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            ></textarea>
        </div>
    );
}
