'use client';

import React from 'react';
import Add from '../../../../public/svgs/add';
import Minus from '../../../../public/svgs/minus';
import { motion } from 'framer-motion';
import { useSWRConfig } from 'swr';
import useToasts from '../../../(hooks)/useToasts';
import { TOAST_TYPE } from '../../../(types)/api';
import SimpleButton from '../../ui/buttons/simple';

const variants = {
    expand: { display: 'flex', transition: { duration: 0.5 } },
    contract: { display: 'none', transition: { duration: 0.5 } },
};

export default function AddProject() {
    const { mutate } = useSWRConfig();
    const { createToast } = useToasts();

    const [isExpanded, toggleExpanded] = React.useState(false);
    const [input, setInput] = React.useState('');

    async function createProject() {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                body: JSON.stringify({ name: input }),
            });
            if (res.ok) {
                createToast('Project created', TOAST_TYPE.SUCCESS);
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
        <div className="flex h-[60px]">
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
                        className="mx-2"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <SimpleButton
                        text="Create"
                        onClick={createProject}
                        type="button"
                    />
                </div>
            </motion.div>
        </div>
    );
}
