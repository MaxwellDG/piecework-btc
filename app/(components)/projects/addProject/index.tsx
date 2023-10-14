'use client';

import React from 'react';
import Add from '../../../../public/svgs/add';
import Minus from '../../../../public/svgs/minus';
import { motion } from 'framer-motion';
import { useSWRConfig } from 'swr';

const variants = {
    expand: { display: 'flex', transition: { duration: 0.5 } },
    contract: { display: 'none', transition: { duration: 0.5 } },
};

export default function AddProject() {
    const { mutate } = useSWRConfig();

    const [isExpanded, toggleExpanded] = React.useState(false);
    const [input, setInput] = React.useState('');

    async function createProject() {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                body: JSON.stringify({ name: input }),
            });
            if (res.ok) {
                mutate('/api/projects');
                mutate('/api/activity');
                setInput('');
                toggleExpanded(false);
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
                {isExpanded ? Minus('#F2A900', 30) : Add('#F2A900', 30)}
            </button>
            <motion.div
                variants={variants}
                initial={variants.contract}
                animate={isExpanded ? variants.expand : variants.contract}
            >
                <div className={`flex items-center justify-end`}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered mx-2"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={createProject}
                        className="button"
                    >
                        Create
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
