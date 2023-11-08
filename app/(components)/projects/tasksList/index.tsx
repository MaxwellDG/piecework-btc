'use client';

import React, { MouseEvent, useState } from 'react';
import TaskComponentList from './componentList';
import useSWR from 'swr';
import Loading from '../../loading';
import { ITask } from '../../../../db/models/task/types';
import useToasts from '../../../(hooks)/useToasts';
import { TOAST_TYPE } from '../../../(types)/api';
import ConfirmModal from '../../modals/confirm';

type Props = {
    projectId: string;
};

export default function TasksList({ projectId }: Props) {
    const { data, isLoading, error, mutate } = useSWR(
        '/api/tasks/' + projectId,
        async function (url) {
            const res = await fetch(url);
            const data = await res.json();
            return data?.tasks ?? [];
        }
    );
    const { createToast } = useToasts();

    const [showConfirmModal, toggleConfirmModal] = useState(false);
    const [focusedTask, setFocusedTask] = useState<ITask | null>(null);

    async function deleteTask(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (focusedTask === null) return null;

        const res = await fetch(`/api/tasks/${projectId}/${focusedTask?._id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            mutate();
            createToast('Task deleted', TOAST_TYPE.INFO);
            toggleConfirmModal(false);
            setFocusedTask(null);
        } else {
            console.error(await res.text());
        }
    }

    async function toggleDeleteModal(
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        task?: ITask
    ) {
        e.preventDefault();
        e.stopPropagation();
        if (task) setFocusedTask(task);
        toggleConfirmModal(bool);
    }

    return (
        <div className="w-full sm:h-96 flex overflow-y-auto">
            {isLoading ? (
                Loading()
            ) : (
                <TaskComponentList
                    tasks={data}
                    toggleDeleteModal={toggleDeleteModal}
                />
            )}
            {/* Modals */}
            {showConfirmModal && (
                <ConfirmModal
                    closeModal={(e) => toggleDeleteModal(e, false)}
                    header="Confirm"
                    content={`Are you sure you'd like to delete the task: ${focusedTask?.name}?`}
                    buttonFuncs={[
                        (e) => toggleDeleteModal(e, false),
                        deleteTask,
                    ]}
                    buttonTexts={['Cancel', 'Delete']}
                />
            )}
        </div>
    );
}
