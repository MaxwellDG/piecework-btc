'use client';

import React from 'react';
import Add from '../../../../public/svgs/add';
import Minus from '../../../../public/svgs/minus';
import { fetchWrapper } from '../../../api/_helpers/fetch-wrapper';

export default function AddProject() {
    const [isExpanded, toggleExpanded] = React.useState(false);
    const [input, setInput] = React.useState('');

    async function createProject() {
        try {
            const res = await fetchWrapper.post('/api/projects', {
                name: input,
            });
            if (res) {
                console.log('Created project');
            }
        } catch (e) {
            console.log('Error creating project', e);
        }
    }

    return (
        <div className="flex">
            <button
                type="button"
                onClick={() => toggleExpanded((prev) => !prev)}
            >
                {isExpanded ? Add('#F2A900', 30) : Minus('#F2A900', 30)}
            </button>
            <input
                type="text"
                placeholder="Company"
                className="input input-bordered w-20 mx-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="button" onClick={createProject}>
                Create
            </button>
        </div>
    );
}
