'use client';

import React from 'react';
import Add from '../../../../public/svgs/add';
import Minus from '../../../../public/svgs/minus';
import { fetchWrapper } from '../../../api/_helpers/fetch-wrapper';
import { motion } from 'framer-motion';

const variants = {
    expand: { display: 'flex', transition: { duration: 0.5 } },
    contract: { display: 'none', transition: { duration: 0.5 } },
};

export default function AddProject() {
    const [isExpanded, toggleExpanded] = React.useState(false);
    const [input, setInput] = React.useState('');

    async function createProject() {
        console.log('Creating project....');
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