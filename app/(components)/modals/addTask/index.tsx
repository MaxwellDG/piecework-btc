'use client';

import { useSWRConfig } from 'swr';
import ModalWrapper from '..';
import { useState } from 'react';

type Props = {
    projectId: string;
    path: string;
};

export default async function AddTaskModal({ projectId, path }: Props) {
    const { mutate } = useSWRConfig();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
                description,
                projectId,
            }),
        });

        if (res.ok) {
            setName('');
            setPrice('');
            setDescription('');
            mutate(`/api/projects/${projectId}/tasks`);
            mutate('/api/activity');
        } else {
            console.error(await res.text());
        }
    }

    return (
        <ModalWrapper path={path}>
            <form onSubmit={handleSubmit}>
                <div className="flex mb-2">
                    <label htmlFor="name" className="mr-2 w-20">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered flex flex-1"
                        required
                    />
                </div>
                <div className="flex mb-2">
                    <label htmlFor="price" className="mr-2 w-20">
                        Price:
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="input input-bordered flex flex-1"
                        required
                    />
                </div>
                <div className="flex items-start mb-8">
                    <label htmlFor="description" className="mr-2 w-20">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input input-bordered flex flex-1"
                        required
                    />
                </div>
                <button type="submit" className="button w-full">
                    Submit
                </button>
            </form>
        </ModalWrapper>
    );
}
