'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IProject } from '../../../../db/modeling/project/types';
import Chevron from '../../../../public/svgs/chevron';
import Delete from '../../../../public/svgs/delete';
import Edit from '../../../../public/svgs/edit';
import ConfirmModal from '../../modals/confirm';
import useToasts from '../../../(hooks)/useToasts';
import { TOAST_TYPE } from '../../../(types)/api';
import { useSWRConfig } from 'swr';

type Props = {
    project: IProject;
};

export default function Project({ project }: Props) {
    const { _id, name, company, updatedAt, createdAt } = project;
    const { createToast } = useToasts();
    const { mutate } = useSWRConfig();

    const [_name, _setName] = useState(name);
    const [showConfirmModal, toggleConfirmModal] = useState(false);
    const [showEditModal, toggleEditModal] = useState(false);

    async function deleteProject(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        const res = await fetch(`/api/projects/${_id}`, {
            method: 'DELETE',
            body: JSON.stringify({ name }),
        });

        if (res.ok) {
            createToast('Project deleted', TOAST_TYPE.INFO);
            toggleConfirmModal(false);
        } else {
            console.error(await res.text());
        }
    }

    async function editProject(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        const res = await fetch(`/api/projects`, {
            method: 'PATCH',
            body: JSON.stringify({ name: _name, _id }),
        });

        if (res.ok) {
            mutate(`/api/projects`);
            createToast('Project updated', TOAST_TYPE.INFO);
            toggleEditModal(false);
        } else {
            console.error(await res.text());
        }
    }

    function toggleConfirm(e: React.MouseEvent<HTMLElement>, bool: boolean) {
        e.preventDefault();
        e.stopPropagation();
        toggleConfirmModal(bool);
    }

    function toggleEdit(e: React.MouseEvent<HTMLElement>, bool: boolean) {
        e.preventDefault();
        e.stopPropagation();
        toggleEditModal(bool);
    }

    return (
        <Link
            href={`/dashboard/projects/${_id}`}
            className="w-full p-2 flex justify-between border items-center"
        >
            <div>
                <p>{name}</p>
            </div>
            <div className="flex gap-x-2 items-center">
                <button
                    className="button"
                    onClick={(e) => toggleConfirm(e, true)}
                >
                    {Delete('black', 30)}
                </button>
                <button className="button" onClick={(e) => toggleEdit(e, true)}>
                    {Edit('black', 30)}
                </button>
                {Chevron('black', 15)}
            </div>

            {/* Modals */}
            {showConfirmModal && (
                <ConfirmModal
                    closeModal={(e) => toggleConfirm(e, false)}
                    header="Confirm"
                    content={`Are you sure you'd like to delete the project: ${project.name}?`}
                    buttonFuncs={[
                        (e) => toggleConfirm(e, false),
                        deleteProject,
                    ]}
                    buttonTexts={['Cancel', 'Delete']}
                />
            )}
            {showEditModal && (
                <ConfirmModal
                    closeModal={(e) => toggleEdit(e, false)}
                    header="Edit project"
                    content={
                        <input
                            className="input input-bordered"
                            type="text"
                            value={_name}
                            onChange={(e) => _setName(e.target.value)}
                        />
                    }
                    buttonFuncs={[(e) => toggleEdit(e, false), editProject]}
                    buttonTexts={['Cancel', 'Submit']}
                />
            )}
        </Link>
    );
}
