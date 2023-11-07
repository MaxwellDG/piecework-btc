'use client';

import { useEffect, useState, useRef, use } from 'react';
import NextImage from 'next/image';

type Props = {
    _name: string;
    _desc: string;
    price: number;
    projectId: string;
    taskId: string;
};

export default function TaskInformation({
    _name,
    _desc,
    price,
    projectId,
    taskId,
}: Props) {
    const [desc, setDesc] = useState(_desc);
    const [name, setName] = useState(_name);
    const descRef = useRef(_desc);
    const nameRef = useRef(_name);

    useEffect(() => {
        window.addEventListener('beforeunload', updateTask);

        return () => {
            updateTask();
            window.removeEventListener('beforeunload', updateTask);
        };
    }, []);

    const updateTask = () => {
        const changedDesc = descRef.current !== _desc;
        const changedName = nameRef.current !== _name;
        if (changedDesc || changedName) {
            fetch(`/api/tasks/${projectId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    _id: taskId,
                    desc: descRef.current,
                    name: nameRef.current,
                }),
                keepalive: true,
            });
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-between mb-4 items-center">
                <input
                    type="text"
                    className="text-3xl font-semibold flex flex-1 mr-4 px-2"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        nameRef.current = e.target.value;
                    }}
                />
                <div className="flex items-center">
                    <p className="mr-2">{price}</p>
                    <NextImage
                        src="/btc-logo.png"
                        height={24}
                        width={24}
                        alt="btc-logo"
                    />
                </div>
            </div>
            <textarea
                className="mb-8 h-32 px-2"
                value={desc}
                onChange={(e) => {
                    setDesc(e.target.value);
                    descRef.current = e.target.value;
                }}
            ></textarea>
        </div>
    );
}
