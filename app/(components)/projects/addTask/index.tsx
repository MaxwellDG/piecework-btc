import React from 'react';
import Add from '../../../../public/svgs/add';
import Link from 'next/link';
import AddTaskModal from '../../modals/addTask';

type Props = {
    projectId: string;
    modalOpen: boolean;
    path: string;
};

export default function AddTask({ projectId, modalOpen, path }: Props) {
    return (
        <div className="flex">
            <Link href="?modal=true">{Add('#F2A900', 30)}</Link>
            {modalOpen && <AddTaskModal projectId={projectId} path={path} />}
        </div>
    );
}
